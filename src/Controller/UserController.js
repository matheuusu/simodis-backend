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
        html: `<html>
                    <body>
                        <div
                        style="
                            border-width: 1px;
                            border-top: 1px solid;
                            border-bottom: 1px solid;
                            border-left: 1px solid;
                            border-right: 1px solid;
                            border-radius: 8px;
                            width: 750px;
                            height: 300px;
                            display: flex;
                            flex-direction: column;
                            align-items: center;
                            justify-content: center;
                            background-color: rgb(240, 242, 255);
                        "
                        >
                        <div
                            style="
                            background-color: #3485ff;
                            width: 750px;
                            margin-top: -48px;
                            height: 150px;
                            border-radius: 8px;
                            border-bottom-left-radius: 0px;
                            border-bottom-right-radius: 0px;
                            display: flex;
                            flex-direction: column;
                            align-items: center;
                            justify-content: center;
                            "
                        >
                            <h1 style="color: white">Solicitação de alteração de Senha</h1>
                            <h2 style="margin-top: 0px; color: white">
                            Copie o codigo e cole no campo do token para alterar a senha
                            </h2>
                        </div>
                        <div
                            style="
                            width: 600px;
                            margin-top: 50px;
                            height: 50px;
                            display: flex;
                            flex-direction: row;
                            justify-content: center;
                            align-items: center;
                            border-radius: 1px solid;
                            border-color: black;
                            border-width: 1px;
                            border-top: 1px solid;
                            border-bottom: 1px solid;
                            border-left: 1px solid;
                            border-right: 1px solid;
                            border-radius: 8px;
                            "
                        >
                            <h3 style="color: black; font-size: 20px">${token}</h3>
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
