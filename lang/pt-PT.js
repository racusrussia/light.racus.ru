import strapi from '~/api/query/strapi'

export default async ( context, locale ) => {
  const messages = await strapi.messages(locale)
  await context.store.dispatch('modules/messages/GET_LOCALE', locale)
  return messages
}
