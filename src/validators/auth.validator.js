export class AuthValidator {
  valid(endpoint, field){
    let valid = true
    let message = 'Succesfull operation'

    if (!field) {
      valid = false
      message = `Field '${endpoint}' is required` 
    }

    else if (field.trim() == '') {
      valid = false
      message = `Field '${endpoint}' cannot be empty`
    }

    return {
      valid,
      message
    }
  }

  static username(body) {
    const { username } = body
    const validation = new AuthValidator().valid('username', username)
    
    if (!validation.valid) 
      return validation

    let valid = true
    let message = 'Succesfull operation'

    if (typeof(username) != 'string') {
      valid = false
      message = 'Field "username" must be a string'
    }

    return {
      valid,
      message
    }
  }

  static password(body) {
    const { password } = body
    const validation = new AuthValidator().valid('password', password)
    
    if (!validation.valid)
      return validation

    let valid = true
    let message = 'Succesfull operation'

    if (!Array.from(`${password}`.trim()).some(char => !isNaN(char) && char !== ' ' )) {
      valid = false
      message = 'Weak password: Must contains a number'
    }

    if (!Array.from(`${password}`.trim()).some(char => /[a-zA-Z]/.test(char))) {
      valid = false
      message = 'Weak password: Must contains a letter'
    }

    return {
      valid,
      message
    }
  }
}