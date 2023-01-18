export const inputsRegistro = [
  {
    type: 'text',
    etiqueta: 'Nombre',
    for: 'nombre',
    placeholder: 'Cómo te llamas?',
    value: 'nombre',
    onChange: 'setNombre'
  },
  {
    type: 'email',
    etiqueta: 'Email',
    for: 'email',
    placeholder: 'ejemplo@correo.com',
    value: 'email',
    onChange: 'setEmail'
  },
  {
    type: 'password',
    etiqueta: 'Password',
    for: 'password',
    placeholder: 'Indica una contraseña',
    value: 'password',
    onChange: 'setPassword'
  },
  {
    type: 'password',
    etiqueta: 'Repetir Password',
    for: 'repetirPassword',
    placeholder: 'Confirma tu contreña',
    value: 'repetirPassword',
    onChange: 'setRepetirPassword'
  }
]

export const inputsLogin = [
  {
    type: 'email',
    etiqueta: 'Email',
    placeholder: 'Email registrado',
    for: 'email'
  },
  {
    type: 'password',
    etiqueta: 'Password',
    placeholder: 'Password registrado',
    for: 'password'
  }
];

export const inputsNuevoPassword = [
  {
    type: 'password',
    etiqueta: 'Nuevo Password',
    for: 'password',
    placeholder: 'Indica una contraseña'
  },
  {
    type: 'password',
    etiqueta: 'Repetir Nuevo Password',
    for: 'password2',
    placeholder: 'Confirma tu contreña'
  }
]