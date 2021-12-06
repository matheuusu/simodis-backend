const bcrypt = require('bcrypt')
const { sign, verify } = require('jsonwebtoken')
const { validationResult, matchedData } = require('express-validator')

const { Usuarios } = require('../Models/Usuarios')
const { Course } = require('../Models/Course')
const { Grades } = require('../Models/Grades')
const { Class } = require('../Models/Class')

const transport = require('../../config/index')

module.exports = {
  getUsers: async (req, res) => {
    let users = await Usuarios.findAll()

    res.json({ users })
  },

  infoUsers: async (req, res) => {
    let token = await req.query.token

    let user = await Usuarios.findOne({
      where: {
        token: token
      }
    })

    res.json({
      name: user.name,
      email: user.email,
      enrollment: user.enrollment
    })
  },

  updateUser: async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      res.json({ error: errors.mapped() })
      return
    }

    const data = matchedData(req)

    if (data.novoName) {
      await Usuarios.update(
        { name: data.novoName },
        {
          where: {
            token: data.token
          }
        }
      )
    }

    if (data.novoEmail) {
      await Usuarios.update(
        { email: data.novoEmail },
        {
          where: {
            token: data.token
          }
        }
      )
    }

    if (data.novaPassword) {
      const passwordUpdate = await bcrypt.hash(data.novaPassword, 10)
      await Usuarios.update(
        { password: passwordUpdate },
        {
          where: {
            token: data.token
          }
        }
      )
    }

    res.json({})
  },

  recoverPassword: async (req, res) => {
    const { email } = req.query

    const verifyEmail = await Usuarios.findOne({
      where: {
        email
      }
    })

    if (!verifyEmail) {
      return res.json({ error: 'Email não cadastrado!' })
    }

    const token = sign({ email }, `${process.env.KEY_RECOVER_PASSWORD}`, {
      expiresIn: '20m'
    })

    transport.sendMail(
      {
        from: `${process.env.SMTP_USER}`,
        to: email,
        subject: 'Solicitação para alteração de senha',
        html: `
        <html>
          <head>
            <style>
              * {
              box-sizing: border-box;
            }
      
            
            .container {
              background: #85d0bc;
              border: 1px solid #028082;
              width: 450px;
              height: 400px;
              margin: 0 auto;
              color: #028082;
            }

            .text {
              width: 80%;
              margin: 0 auto;
              padding: 1rem;
              border: 1px solid #028082;
              border-radius: 5px;
            }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="text">
                <p>${token}</p>
              </div>
              <div class="text">
                <p>daquele jeitão</p>
              </div>
            </div>
          </body>
        </html>`
      },
      function (err) {
        if (err) {
          return res.status(400).json({
            err,
            mensagem: 'E-mail não enviado com sucesso'
          })
        }
      }
    )

    res.json({ token, mensagem: 'E-mail enviado com sucesso!' })
  },

  altPassword: (req, res) => {
    const { token, newPassword } = req.body

    verify(
      token,
      `${process.env.KEY_RECOVER_PASSWORD}`,
      async function (err, decoded) {
        if (err) {
          return res.json({ error: 'Token inválido!' })
        }

        const passwordUpdate = await bcrypt.hash(newPassword, 10)
        await Usuarios.update(
          { password: passwordUpdate },
          {
            where: {
              email: decoded.email
            }
          }
        )

        res.json({})
      }
    )
  }
}
