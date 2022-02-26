export const createForm = `
  mutation($form: createFormInput!) {
    createForm(input: $form) {
      form{
        id
      }
    }
  }
`
