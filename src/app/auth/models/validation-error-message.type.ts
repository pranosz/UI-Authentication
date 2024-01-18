export type ValidationErrorsMessage = 
'required' | 
'passwordsDoesNotMatch' | 
'userExists' | 
'serverError'| 
'characterRange' | 
'passwordStrength';

export const ValidationErrorsMessage = {
    required: 'required' as ValidationErrorsMessage,
    passwordsDoesNotMatch: 'passwordsDoesNotMatch' as ValidationErrorsMessage,
    userExists: 'userExists' as ValidationErrorsMessage,
    serverError: 'serverError' as ValidationErrorsMessage,
    characterRange: 'characterRange' as ValidationErrorsMessage,
    passwordStrength: 'passwordStrength' as ValidationErrorsMessage
}