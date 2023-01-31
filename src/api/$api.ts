import type { AspidaClient, BasicHeaders } from 'aspida'
import { dataToURLString } from 'aspida'
import type { Methods as Methods0 } from './wp/v2'
import type { Methods as Methods1 } from './wp/v2/block-directory/search'
import type { Methods as Methods2 } from './wp/v2/block-patterns/categories'
import type { Methods as Methods3 } from './wp/v2/block-patterns/patterns'
import type { Methods as Methods4 } from './wp/v2/block-renderer/_name@string'
import type { Methods as Methods5 } from './wp/v2/block-types'
import type { Methods as Methods6 } from './wp/v2/block-types/_namespace@string'
import type { Methods as Methods7 } from './wp/v2/block-types/_namespace@string/_name@string'
import type { Methods as Methods8 } from './wp/v2/blocks'
import type { Methods as Methods9 } from './wp/v2/blocks/_id@string'
import type { Methods as Methods10 } from './wp/v2/blocks/_id@string/autosaves'
import type { Methods as Methods11 } from './wp/v2/blocks/_parent@string/autosaves/_id@string'
import type { Methods as Methods12 } from './wp/v2/blocks/_parent@string/revisions'
import type { Methods as Methods13 } from './wp/v2/blocks/_parent@string/revisions/_id@string'
import type { Methods as Methods14 } from './wp/v2/categories'
import type { Methods as Methods15 } from './wp/v2/categories/_id@string'
import type { Methods as Methods16 } from './wp/v2/comments'
import type { Methods as Methods17 } from './wp/v2/comments/_id@string'
import type { Methods as Methods18 } from './wp/v2/global-styles/_id@string'
import type { Methods as Methods19 } from './wp/v2/global-styles/themes/_stylesheet@string'
import type { Methods as Methods20 } from './wp/v2/global-styles/themes/_stylesheet@string/variations'
import type { Methods as Methods21 } from './wp/v2/media'
import type { Methods as Methods22 } from './wp/v2/media/_id@string'
import type { Methods as Methods23 } from './wp/v2/media/_id@string/edit'
import type { Methods as Methods24 } from './wp/v2/media/_id@string/post-process'
import type { Methods as Methods25 } from './wp/v2/menu-items'
import type { Methods as Methods26 } from './wp/v2/menu-items/_id@string'
import type { Methods as Methods27 } from './wp/v2/menu-items/_id@string/autosaves'
import type { Methods as Methods28 } from './wp/v2/menu-items/_parent@string/autosaves/_id@string'
import type { Methods as Methods29 } from './wp/v2/menu-locations'
import type { Methods as Methods30 } from './wp/v2/menu-locations/_location@string'
import type { Methods as Methods31 } from './wp/v2/menus'
import type { Methods as Methods32 } from './wp/v2/menus/_id@string'
import type { Methods as Methods33 } from './wp/v2/navigation'
import type { Methods as Methods34 } from './wp/v2/navigation/_id@string'
import type { Methods as Methods35 } from './wp/v2/navigation/_id@string/autosaves'
import type { Methods as Methods36 } from './wp/v2/navigation/_parent@string/autosaves/_id@string'
import type { Methods as Methods37 } from './wp/v2/navigation/_parent@string/revisions'
import type { Methods as Methods38 } from './wp/v2/navigation/_parent@string/revisions/_id@string'
import type { Methods as Methods39 } from './wp/v2/pages'
import type { Methods as Methods40 } from './wp/v2/pages/_id@string'
import type { Methods as Methods41 } from './wp/v2/pages/_id@string/autosaves'
import type { Methods as Methods42 } from './wp/v2/pages/_parent@string/autosaves/_id@string'
import type { Methods as Methods43 } from './wp/v2/pages/_parent@string/revisions'
import type { Methods as Methods44 } from './wp/v2/pages/_parent@string/revisions/_id@string'
import type { Methods as Methods45 } from './wp/v2/pattern-directory/patterns'
import type { Methods as Methods46 } from './wp/v2/plugins'
import type { Methods as Methods47 } from './wp/v2/plugins/_plugin@string'
import type { Methods as Methods48 } from './wp/v2/posts'
import type { Methods as Methods49 } from './wp/v2/posts/_id@string'
import type { Methods as Methods50 } from './wp/v2/posts/_id@string/autosaves'
import type { Methods as Methods51 } from './wp/v2/posts/_parent@string/autosaves/_id@string'
import type { Methods as Methods52 } from './wp/v2/posts/_parent@string/revisions'
import type { Methods as Methods53 } from './wp/v2/posts/_parent@string/revisions/_id@string'
import type { Methods as Methods54 } from './wp/v2/search'
import type { Methods as Methods55 } from './wp/v2/settings'
import type { Methods as Methods56 } from './wp/v2/sidebars'
import type { Methods as Methods57 } from './wp/v2/sidebars/_id@string'
import type { Methods as Methods58 } from './wp/v2/statuses'
import type { Methods as Methods59 } from './wp/v2/statuses/_status@string'
import type { Methods as Methods60 } from './wp/v2/tags'
import type { Methods as Methods61 } from './wp/v2/tags/_id@string'
import type { Methods as Methods62 } from './wp/v2/taxonomies'
import type { Methods as Methods63 } from './wp/v2/taxonomies/_taxonomy@string'
import type { Methods as Methods64 } from './wp/v2/template-parts'
import type { Methods as Methods65 } from './wp/v2/template-parts/_id@string'
import type { Methods as Methods66 } from './wp/v2/template-parts/_id@string/autosaves'
import type { Methods as Methods67 } from './wp/v2/template-parts/_parent@string/autosaves/_id@string'
import type { Methods as Methods68 } from './wp/v2/template-parts/_parent@string/revisions'
import type { Methods as Methods69 } from './wp/v2/template-parts/_parent@string/revisions/_id@string'
import type { Methods as Methods70 } from './wp/v2/templates'
import type { Methods as Methods71 } from './wp/v2/templates/_id@string'
import type { Methods as Methods72 } from './wp/v2/templates/_id@string/autosaves'
import type { Methods as Methods73 } from './wp/v2/templates/_parent@string/autosaves/_id@string'
import type { Methods as Methods74 } from './wp/v2/templates/_parent@string/revisions'
import type { Methods as Methods75 } from './wp/v2/templates/_parent@string/revisions/_id@string'
import type { Methods as Methods76 } from './wp/v2/themes'
import type { Methods as Methods77 } from './wp/v2/themes/_stylesheet@string'
import type { Methods as Methods78 } from './wp/v2/types'
import type { Methods as Methods79 } from './wp/v2/types/_type@string'
import type { Methods as Methods80 } from './wp/v2/users'
import type { Methods as Methods81 } from './wp/v2/users/_id@string'
import type { Methods as Methods82 } from './wp/v2/users/_user_id@string/application-passwords'
import type { Methods as Methods83 } from './wp/v2/users/_user_id@string/application-passwords/_uuid@string'
import type { Methods as Methods84 } from './wp/v2/users/_user_id@string/application-passwords/introspect'
import type { Methods as Methods85 } from './wp/v2/users/me'
import type { Methods as Methods86 } from './wp/v2/widget-types'
import type { Methods as Methods87 } from './wp/v2/widget-types/_id@string'
import type { Methods as Methods88 } from './wp/v2/widget-types/_id@string/encode'
import type { Methods as Methods89 } from './wp/v2/widget-types/_id@string/render'
import type { Methods as Methods90 } from './wp/v2/widgets'
import type { Methods as Methods91 } from './wp/v2/widgets/_id@string'

const api = <T>({ baseURL, fetch }: AspidaClient<T>) => {
  const prefix = (baseURL === undefined ? '' : baseURL).replace(/\/$/, '')
  const PATH0 = '/wp/v2'
  const PATH1 = '/wp/v2/block-directory/search'
  const PATH2 = '/wp/v2/block-patterns/categories'
  const PATH3 = '/wp/v2/block-patterns/patterns'
  const PATH4 = '/wp/v2/block-renderer'
  const PATH5 = '/wp/v2/block-types'
  const PATH6 = '/wp/v2/blocks'
  const PATH7 = '/autosaves'
  const PATH8 = '/revisions'
  const PATH9 = '/wp/v2/categories'
  const PATH10 = '/wp/v2/comments'
  const PATH11 = '/wp/v2/global-styles'
  const PATH12 = '/wp/v2/global-styles/themes'
  const PATH13 = '/variations'
  const PATH14 = '/wp/v2/media'
  const PATH15 = '/edit'
  const PATH16 = '/post-process'
  const PATH17 = '/wp/v2/menu-items'
  const PATH18 = '/wp/v2/menu-locations'
  const PATH19 = '/wp/v2/menus'
  const PATH20 = '/wp/v2/navigation'
  const PATH21 = '/wp/v2/pages'
  const PATH22 = '/wp/v2/pattern-directory/patterns'
  const PATH23 = '/wp/v2/plugins'
  const PATH24 = '/wp/v2/posts'
  const PATH25 = '/wp/v2/search'
  const PATH26 = '/wp/v2/settings'
  const PATH27 = '/wp/v2/sidebars'
  const PATH28 = '/wp/v2/statuses'
  const PATH29 = '/wp/v2/tags'
  const PATH30 = '/wp/v2/taxonomies'
  const PATH31 = '/wp/v2/template-parts'
  const PATH32 = '/wp/v2/templates'
  const PATH33 = '/wp/v2/themes'
  const PATH34 = '/wp/v2/types'
  const PATH35 = '/wp/v2/users'
  const PATH36 = '/application-passwords'
  const PATH37 = '/application-passwords/introspect'
  const PATH38 = '/wp/v2/users/me'
  const PATH39 = '/wp/v2/widget-types'
  const PATH40 = '/encode'
  const PATH41 = '/render'
  const PATH42 = '/wp/v2/widgets'
  const GET = 'GET'
  const POST = 'POST'
  const PUT = 'PUT'
  const DELETE = 'DELETE'
  const PATCH = 'PATCH'

  return {
    wp: {
      v2: {
        block_directory: {
          search: {
            /**
             * @returns OK
             */
            get: (option: { query: Methods1['get']['query']; config?: T | undefined }) =>
              fetch<Methods1['get']['resBody'], BasicHeaders, Methods1['get']['status']>(
                prefix,
                PATH1,
                GET,
                option
              ).json(),
            /**
             * @returns OK
             */
            $get: (option: { query: Methods1['get']['query']; config?: T | undefined }) =>
              fetch<Methods1['get']['resBody'], BasicHeaders, Methods1['get']['status']>(
                prefix,
                PATH1,
                GET,
                option
              )
                .json()
                .then(r => r.body),
            $path: (
              option?: { method?: 'get' | undefined; query: Methods1['get']['query'] } | undefined
            ) =>
              `${prefix}${PATH1}${
                option && option.query ? `?${dataToURLString(option.query)}` : ''
              }`,
          },
        },
        block_patterns: {
          categories: {
            /**
             * @returns OK
             */
            get: (option?: { config?: T | undefined } | undefined) =>
              fetch<Methods2['get']['resBody'], BasicHeaders, Methods2['get']['status']>(
                prefix,
                PATH2,
                GET,
                option
              ).json(),
            /**
             * @returns OK
             */
            $get: (option?: { config?: T | undefined } | undefined) =>
              fetch<Methods2['get']['resBody'], BasicHeaders, Methods2['get']['status']>(
                prefix,
                PATH2,
                GET,
                option
              )
                .json()
                .then(r => r.body),
            $path: () => `${prefix}${PATH2}`,
          },
          patterns: {
            /**
             * @returns OK
             */
            get: (option?: { config?: T | undefined } | undefined) =>
              fetch<Methods3['get']['resBody'], BasicHeaders, Methods3['get']['status']>(
                prefix,
                PATH3,
                GET,
                option
              ).json(),
            /**
             * @returns OK
             */
            $get: (option?: { config?: T | undefined } | undefined) =>
              fetch<Methods3['get']['resBody'], BasicHeaders, Methods3['get']['status']>(
                prefix,
                PATH3,
                GET,
                option
              )
                .json()
                .then(r => r.body),
            $path: () => `${prefix}${PATH3}`,
          },
        },
        block_renderer: {
          _name: (val3: string) => {
            const prefix3 = `${PATH4}/${val3}`

            return {
              /**
               * @returns OK
               */
              get: (
                option?:
                  | { query?: Methods4['get']['query'] | undefined; config?: T | undefined }
                  | undefined
              ) =>
                fetch<Methods4['get']['resBody'], BasicHeaders, Methods4['get']['status']>(
                  prefix,
                  prefix3,
                  GET,
                  option
                ).json(),
              /**
               * @returns OK
               */
              $get: (
                option?:
                  | { query?: Methods4['get']['query'] | undefined; config?: T | undefined }
                  | undefined
              ) =>
                fetch<Methods4['get']['resBody'], BasicHeaders, Methods4['get']['status']>(
                  prefix,
                  prefix3,
                  GET,
                  option
                )
                  .json()
                  .then(r => r.body),
              /**
               * @returns OK
               */
              post: (option: { body: Methods4['post']['reqBody']; config?: T | undefined }) =>
                fetch<Methods4['post']['resBody'], BasicHeaders, Methods4['post']['status']>(
                  prefix,
                  prefix3,
                  POST,
                  option,
                  'URLSearchParams'
                ).json(),
              /**
               * @returns OK
               */
              $post: (option: { body: Methods4['post']['reqBody']; config?: T | undefined }) =>
                fetch<Methods4['post']['resBody'], BasicHeaders, Methods4['post']['status']>(
                  prefix,
                  prefix3,
                  POST,
                  option,
                  'URLSearchParams'
                )
                  .json()
                  .then(r => r.body),
              $path: (
                option?: { method?: 'get' | undefined; query: Methods4['get']['query'] } | undefined
              ) =>
                `${prefix}${prefix3}${
                  option && option.query ? `?${dataToURLString(option.query)}` : ''
                }`,
            }
          },
        },
        block_types: {
          _namespace: (val3: string) => {
            const prefix3 = `${PATH5}/${val3}`

            return {
              _name: (val4: string) => {
                const prefix4 = `${prefix3}/${val4}`

                return {
                  /**
                   * @returns OK
                   */
                  get: (
                    option?:
                      | { query?: Methods7['get']['query'] | undefined; config?: T | undefined }
                      | undefined
                  ) =>
                    fetch<Methods7['get']['resBody'], BasicHeaders, Methods7['get']['status']>(
                      prefix,
                      prefix4,
                      GET,
                      option
                    ).json(),
                  /**
                   * @returns OK
                   */
                  $get: (
                    option?:
                      | { query?: Methods7['get']['query'] | undefined; config?: T | undefined }
                      | undefined
                  ) =>
                    fetch<Methods7['get']['resBody'], BasicHeaders, Methods7['get']['status']>(
                      prefix,
                      prefix4,
                      GET,
                      option
                    )
                      .json()
                      .then(r => r.body),
                  $path: (
                    option?:
                      | { method?: 'get' | undefined; query: Methods7['get']['query'] }
                      | undefined
                  ) =>
                    `${prefix}${prefix4}${
                      option && option.query ? `?${dataToURLString(option.query)}` : ''
                    }`,
                }
              },
              /**
               * @returns OK
               */
              get: (
                option?:
                  | { query?: Methods6['get']['query'] | undefined; config?: T | undefined }
                  | undefined
              ) =>
                fetch<Methods6['get']['resBody'], BasicHeaders, Methods6['get']['status']>(
                  prefix,
                  prefix3,
                  GET,
                  option
                ).json(),
              /**
               * @returns OK
               */
              $get: (
                option?:
                  | { query?: Methods6['get']['query'] | undefined; config?: T | undefined }
                  | undefined
              ) =>
                fetch<Methods6['get']['resBody'], BasicHeaders, Methods6['get']['status']>(
                  prefix,
                  prefix3,
                  GET,
                  option
                )
                  .json()
                  .then(r => r.body),
              $path: (
                option?: { method?: 'get' | undefined; query: Methods6['get']['query'] } | undefined
              ) =>
                `${prefix}${prefix3}${
                  option && option.query ? `?${dataToURLString(option.query)}` : ''
                }`,
            }
          },
          /**
           * @returns OK
           */
          get: (
            option?:
              | { query?: Methods5['get']['query'] | undefined; config?: T | undefined }
              | undefined
          ) =>
            fetch<Methods5['get']['resBody'], BasicHeaders, Methods5['get']['status']>(
              prefix,
              PATH5,
              GET,
              option
            ).json(),
          /**
           * @returns OK
           */
          $get: (
            option?:
              | { query?: Methods5['get']['query'] | undefined; config?: T | undefined }
              | undefined
          ) =>
            fetch<Methods5['get']['resBody'], BasicHeaders, Methods5['get']['status']>(
              prefix,
              PATH5,
              GET,
              option
            )
              .json()
              .then(r => r.body),
          $path: (
            option?: { method?: 'get' | undefined; query: Methods5['get']['query'] } | undefined
          ) =>
            `${prefix}${PATH5}${option && option.query ? `?${dataToURLString(option.query)}` : ''}`,
        },
        blocks: {
          _id: (val3: string) => {
            const prefix3 = `${PATH6}/${val3}`

            return {
              autosaves: {
                /**
                 * @returns OK
                 */
                get: (
                  option?:
                    | { query?: Methods10['get']['query'] | undefined; config?: T | undefined }
                    | undefined
                ) =>
                  fetch<Methods10['get']['resBody'], BasicHeaders, Methods10['get']['status']>(
                    prefix,
                    `${prefix3}${PATH7}`,
                    GET,
                    option
                  ).json(),
                /**
                 * @returns OK
                 */
                $get: (
                  option?:
                    | { query?: Methods10['get']['query'] | undefined; config?: T | undefined }
                    | undefined
                ) =>
                  fetch<Methods10['get']['resBody'], BasicHeaders, Methods10['get']['status']>(
                    prefix,
                    `${prefix3}${PATH7}`,
                    GET,
                    option
                  )
                    .json()
                    .then(r => r.body),
                /**
                 * @returns OK
                 */
                post: (option: { body: Methods10['post']['reqBody']; config?: T | undefined }) =>
                  fetch<Methods10['post']['resBody'], BasicHeaders, Methods10['post']['status']>(
                    prefix,
                    `${prefix3}${PATH7}`,
                    POST,
                    option,
                    'URLSearchParams'
                  ).json(),
                /**
                 * @returns OK
                 */
                $post: (option: { body: Methods10['post']['reqBody']; config?: T | undefined }) =>
                  fetch<Methods10['post']['resBody'], BasicHeaders, Methods10['post']['status']>(
                    prefix,
                    `${prefix3}${PATH7}`,
                    POST,
                    option,
                    'URLSearchParams'
                  )
                    .json()
                    .then(r => r.body),
                $path: (
                  option?:
                    | { method?: 'get' | undefined; query: Methods10['get']['query'] }
                    | undefined
                ) =>
                  `${prefix}${prefix3}${PATH7}${
                    option && option.query ? `?${dataToURLString(option.query)}` : ''
                  }`,
              },
              /**
               * @returns OK
               */
              get: (
                option?:
                  | { query?: Methods9['get']['query'] | undefined; config?: T | undefined }
                  | undefined
              ) =>
                fetch<Methods9['get']['resBody'], BasicHeaders, Methods9['get']['status']>(
                  prefix,
                  prefix3,
                  GET,
                  option
                ).json(),
              /**
               * @returns OK
               */
              $get: (
                option?:
                  | { query?: Methods9['get']['query'] | undefined; config?: T | undefined }
                  | undefined
              ) =>
                fetch<Methods9['get']['resBody'], BasicHeaders, Methods9['get']['status']>(
                  prefix,
                  prefix3,
                  GET,
                  option
                )
                  .json()
                  .then(r => r.body),
              /**
               * @returns OK
               */
              post: (option: { body: Methods9['post']['reqBody']; config?: T | undefined }) =>
                fetch<Methods9['post']['resBody'], BasicHeaders, Methods9['post']['status']>(
                  prefix,
                  prefix3,
                  POST,
                  option,
                  'URLSearchParams'
                ).json(),
              /**
               * @returns OK
               */
              $post: (option: { body: Methods9['post']['reqBody']; config?: T | undefined }) =>
                fetch<Methods9['post']['resBody'], BasicHeaders, Methods9['post']['status']>(
                  prefix,
                  prefix3,
                  POST,
                  option,
                  'URLSearchParams'
                )
                  .json()
                  .then(r => r.body),
              /**
               * @returns OK
               */
              put: (option: { body: Methods9['put']['reqBody']; config?: T | undefined }) =>
                fetch<Methods9['put']['resBody'], BasicHeaders, Methods9['put']['status']>(
                  prefix,
                  prefix3,
                  PUT,
                  option,
                  'URLSearchParams'
                ).json(),
              /**
               * @returns OK
               */
              $put: (option: { body: Methods9['put']['reqBody']; config?: T | undefined }) =>
                fetch<Methods9['put']['resBody'], BasicHeaders, Methods9['put']['status']>(
                  prefix,
                  prefix3,
                  PUT,
                  option,
                  'URLSearchParams'
                )
                  .json()
                  .then(r => r.body),
              /**
               * @returns OK
               */
              patch: (option: { body: Methods9['patch']['reqBody']; config?: T | undefined }) =>
                fetch<Methods9['patch']['resBody'], BasicHeaders, Methods9['patch']['status']>(
                  prefix,
                  prefix3,
                  PATCH,
                  option,
                  'URLSearchParams'
                ).json(),
              /**
               * @returns OK
               */
              $patch: (option: { body: Methods9['patch']['reqBody']; config?: T | undefined }) =>
                fetch<Methods9['patch']['resBody'], BasicHeaders, Methods9['patch']['status']>(
                  prefix,
                  prefix3,
                  PATCH,
                  option,
                  'URLSearchParams'
                )
                  .json()
                  .then(r => r.body),
              /**
               * @returns OK
               */
              delete: (option: { body: Methods9['delete']['reqBody']; config?: T | undefined }) =>
                fetch<Methods9['delete']['resBody'], BasicHeaders, Methods9['delete']['status']>(
                  prefix,
                  prefix3,
                  DELETE,
                  option,
                  'URLSearchParams'
                ).json(),
              /**
               * @returns OK
               */
              $delete: (option: { body: Methods9['delete']['reqBody']; config?: T | undefined }) =>
                fetch<Methods9['delete']['resBody'], BasicHeaders, Methods9['delete']['status']>(
                  prefix,
                  prefix3,
                  DELETE,
                  option,
                  'URLSearchParams'
                )
                  .json()
                  .then(r => r.body),
              $path: (
                option?: { method?: 'get' | undefined; query: Methods9['get']['query'] } | undefined
              ) =>
                `${prefix}${prefix3}${
                  option && option.query ? `?${dataToURLString(option.query)}` : ''
                }`,
            }
          },
          _parent: (val3: string) => {
            const prefix3 = `${PATH6}/${val3}`

            return {
              autosaves: {
                _id: (val5: string) => {
                  const prefix5 = `${prefix3}${PATH7}/${val5}`

                  return {
                    /**
                     * @returns OK
                     */
                    get: (
                      option?:
                        | { query?: Methods11['get']['query'] | undefined; config?: T | undefined }
                        | undefined
                    ) =>
                      fetch<Methods11['get']['resBody'], BasicHeaders, Methods11['get']['status']>(
                        prefix,
                        prefix5,
                        GET,
                        option
                      ).json(),
                    /**
                     * @returns OK
                     */
                    $get: (
                      option?:
                        | { query?: Methods11['get']['query'] | undefined; config?: T | undefined }
                        | undefined
                    ) =>
                      fetch<Methods11['get']['resBody'], BasicHeaders, Methods11['get']['status']>(
                        prefix,
                        prefix5,
                        GET,
                        option
                      )
                        .json()
                        .then(r => r.body),
                    $path: (
                      option?:
                        | { method?: 'get' | undefined; query: Methods11['get']['query'] }
                        | undefined
                    ) =>
                      `${prefix}${prefix5}${
                        option && option.query ? `?${dataToURLString(option.query)}` : ''
                      }`,
                  }
                },
              },
              revisions: {
                _id: (val5: string) => {
                  const prefix5 = `${prefix3}${PATH8}/${val5}`

                  return {
                    /**
                     * @returns OK
                     */
                    get: (
                      option?:
                        | { query?: Methods13['get']['query'] | undefined; config?: T | undefined }
                        | undefined
                    ) =>
                      fetch<Methods13['get']['resBody'], BasicHeaders, Methods13['get']['status']>(
                        prefix,
                        prefix5,
                        GET,
                        option
                      ).json(),
                    /**
                     * @returns OK
                     */
                    $get: (
                      option?:
                        | { query?: Methods13['get']['query'] | undefined; config?: T | undefined }
                        | undefined
                    ) =>
                      fetch<Methods13['get']['resBody'], BasicHeaders, Methods13['get']['status']>(
                        prefix,
                        prefix5,
                        GET,
                        option
                      )
                        .json()
                        .then(r => r.body),
                    /**
                     * @returns OK
                     */
                    delete: (option: {
                      body: Methods13['delete']['reqBody']
                      config?: T | undefined
                    }) =>
                      fetch<
                        Methods13['delete']['resBody'],
                        BasicHeaders,
                        Methods13['delete']['status']
                      >(prefix, prefix5, DELETE, option, 'URLSearchParams').json(),
                    /**
                     * @returns OK
                     */
                    $delete: (option: {
                      body: Methods13['delete']['reqBody']
                      config?: T | undefined
                    }) =>
                      fetch<
                        Methods13['delete']['resBody'],
                        BasicHeaders,
                        Methods13['delete']['status']
                      >(prefix, prefix5, DELETE, option, 'URLSearchParams')
                        .json()
                        .then(r => r.body),
                    $path: (
                      option?:
                        | { method?: 'get' | undefined; query: Methods13['get']['query'] }
                        | undefined
                    ) =>
                      `${prefix}${prefix5}${
                        option && option.query ? `?${dataToURLString(option.query)}` : ''
                      }`,
                  }
                },
                /**
                 * @returns OK
                 */
                get: (
                  option?:
                    | { query?: Methods12['get']['query'] | undefined; config?: T | undefined }
                    | undefined
                ) =>
                  fetch<Methods12['get']['resBody'], BasicHeaders, Methods12['get']['status']>(
                    prefix,
                    `${prefix3}${PATH8}`,
                    GET,
                    option
                  ).json(),
                /**
                 * @returns OK
                 */
                $get: (
                  option?:
                    | { query?: Methods12['get']['query'] | undefined; config?: T | undefined }
                    | undefined
                ) =>
                  fetch<Methods12['get']['resBody'], BasicHeaders, Methods12['get']['status']>(
                    prefix,
                    `${prefix3}${PATH8}`,
                    GET,
                    option
                  )
                    .json()
                    .then(r => r.body),
                $path: (
                  option?:
                    | { method?: 'get' | undefined; query: Methods12['get']['query'] }
                    | undefined
                ) =>
                  `${prefix}${prefix3}${PATH8}${
                    option && option.query ? `?${dataToURLString(option.query)}` : ''
                  }`,
              },
            }
          },
          /**
           * @returns OK
           */
          get: (
            option?:
              | { query?: Methods8['get']['query'] | undefined; config?: T | undefined }
              | undefined
          ) =>
            fetch<Methods8['get']['resBody'], BasicHeaders, Methods8['get']['status']>(
              prefix,
              PATH6,
              GET,
              option
            ).json(),
          /**
           * @returns OK
           */
          $get: (
            option?:
              | { query?: Methods8['get']['query'] | undefined; config?: T | undefined }
              | undefined
          ) =>
            fetch<Methods8['get']['resBody'], BasicHeaders, Methods8['get']['status']>(
              prefix,
              PATH6,
              GET,
              option
            )
              .json()
              .then(r => r.body),
          /**
           * @returns OK
           */
          post: (option: { body: Methods8['post']['reqBody']; config?: T | undefined }) =>
            fetch<Methods8['post']['resBody'], BasicHeaders, Methods8['post']['status']>(
              prefix,
              PATH6,
              POST,
              option,
              'URLSearchParams'
            ).json(),
          /**
           * @returns OK
           */
          $post: (option: { body: Methods8['post']['reqBody']; config?: T | undefined }) =>
            fetch<Methods8['post']['resBody'], BasicHeaders, Methods8['post']['status']>(
              prefix,
              PATH6,
              POST,
              option,
              'URLSearchParams'
            )
              .json()
              .then(r => r.body),
          $path: (
            option?: { method?: 'get' | undefined; query: Methods8['get']['query'] } | undefined
          ) =>
            `${prefix}${PATH6}${option && option.query ? `?${dataToURLString(option.query)}` : ''}`,
        },
        categories: {
          _id: (val3: string) => {
            const prefix3 = `${PATH9}/${val3}`

            return {
              /**
               * @returns OK
               */
              get: (
                option?:
                  | { query?: Methods15['get']['query'] | undefined; config?: T | undefined }
                  | undefined
              ) =>
                fetch<Methods15['get']['resBody'], BasicHeaders, Methods15['get']['status']>(
                  prefix,
                  prefix3,
                  GET,
                  option
                ).json(),
              /**
               * @returns OK
               */
              $get: (
                option?:
                  | { query?: Methods15['get']['query'] | undefined; config?: T | undefined }
                  | undefined
              ) =>
                fetch<Methods15['get']['resBody'], BasicHeaders, Methods15['get']['status']>(
                  prefix,
                  prefix3,
                  GET,
                  option
                )
                  .json()
                  .then(r => r.body),
              /**
               * @returns OK
               */
              post: (option: { body: Methods15['post']['reqBody']; config?: T | undefined }) =>
                fetch<Methods15['post']['resBody'], BasicHeaders, Methods15['post']['status']>(
                  prefix,
                  prefix3,
                  POST,
                  option,
                  'URLSearchParams'
                ).json(),
              /**
               * @returns OK
               */
              $post: (option: { body: Methods15['post']['reqBody']; config?: T | undefined }) =>
                fetch<Methods15['post']['resBody'], BasicHeaders, Methods15['post']['status']>(
                  prefix,
                  prefix3,
                  POST,
                  option,
                  'URLSearchParams'
                )
                  .json()
                  .then(r => r.body),
              /**
               * @returns OK
               */
              put: (option: { body: Methods15['put']['reqBody']; config?: T | undefined }) =>
                fetch<Methods15['put']['resBody'], BasicHeaders, Methods15['put']['status']>(
                  prefix,
                  prefix3,
                  PUT,
                  option,
                  'URLSearchParams'
                ).json(),
              /**
               * @returns OK
               */
              $put: (option: { body: Methods15['put']['reqBody']; config?: T | undefined }) =>
                fetch<Methods15['put']['resBody'], BasicHeaders, Methods15['put']['status']>(
                  prefix,
                  prefix3,
                  PUT,
                  option,
                  'URLSearchParams'
                )
                  .json()
                  .then(r => r.body),
              /**
               * @returns OK
               */
              patch: (option: { body: Methods15['patch']['reqBody']; config?: T | undefined }) =>
                fetch<Methods15['patch']['resBody'], BasicHeaders, Methods15['patch']['status']>(
                  prefix,
                  prefix3,
                  PATCH,
                  option,
                  'URLSearchParams'
                ).json(),
              /**
               * @returns OK
               */
              $patch: (option: { body: Methods15['patch']['reqBody']; config?: T | undefined }) =>
                fetch<Methods15['patch']['resBody'], BasicHeaders, Methods15['patch']['status']>(
                  prefix,
                  prefix3,
                  PATCH,
                  option,
                  'URLSearchParams'
                )
                  .json()
                  .then(r => r.body),
              /**
               * @returns OK
               */
              delete: (option: { body: Methods15['delete']['reqBody']; config?: T | undefined }) =>
                fetch<Methods15['delete']['resBody'], BasicHeaders, Methods15['delete']['status']>(
                  prefix,
                  prefix3,
                  DELETE,
                  option,
                  'URLSearchParams'
                ).json(),
              /**
               * @returns OK
               */
              $delete: (option: { body: Methods15['delete']['reqBody']; config?: T | undefined }) =>
                fetch<Methods15['delete']['resBody'], BasicHeaders, Methods15['delete']['status']>(
                  prefix,
                  prefix3,
                  DELETE,
                  option,
                  'URLSearchParams'
                )
                  .json()
                  .then(r => r.body),
              $path: (
                option?:
                  | { method?: 'get' | undefined; query: Methods15['get']['query'] }
                  | undefined
              ) =>
                `${prefix}${prefix3}${
                  option && option.query ? `?${dataToURLString(option.query)}` : ''
                }`,
            }
          },
          /**
           * @returns OK
           */
          get: (
            option?:
              | { query?: Methods14['get']['query'] | undefined; config?: T | undefined }
              | undefined
          ) =>
            fetch<Methods14['get']['resBody'], BasicHeaders, Methods14['get']['status']>(
              prefix,
              PATH9,
              GET,
              option
            ).json(),
          /**
           * @returns OK
           */
          $get: (
            option?:
              | { query?: Methods14['get']['query'] | undefined; config?: T | undefined }
              | undefined
          ) =>
            fetch<Methods14['get']['resBody'], BasicHeaders, Methods14['get']['status']>(
              prefix,
              PATH9,
              GET,
              option
            )
              .json()
              .then(r => r.body),
          /**
           * @returns OK
           */
          post: (option: { body: Methods14['post']['reqBody']; config?: T | undefined }) =>
            fetch<Methods14['post']['resBody'], BasicHeaders, Methods14['post']['status']>(
              prefix,
              PATH9,
              POST,
              option,
              'URLSearchParams'
            ).json(),
          /**
           * @returns OK
           */
          $post: (option: { body: Methods14['post']['reqBody']; config?: T | undefined }) =>
            fetch<Methods14['post']['resBody'], BasicHeaders, Methods14['post']['status']>(
              prefix,
              PATH9,
              POST,
              option,
              'URLSearchParams'
            )
              .json()
              .then(r => r.body),
          $path: (
            option?: { method?: 'get' | undefined; query: Methods14['get']['query'] } | undefined
          ) =>
            `${prefix}${PATH9}${option && option.query ? `?${dataToURLString(option.query)}` : ''}`,
        },
        comments: {
          _id: (val3: string) => {
            const prefix3 = `${PATH10}/${val3}`

            return {
              /**
               * @returns OK
               */
              get: (
                option?:
                  | { query?: Methods17['get']['query'] | undefined; config?: T | undefined }
                  | undefined
              ) =>
                fetch<Methods17['get']['resBody'], BasicHeaders, Methods17['get']['status']>(
                  prefix,
                  prefix3,
                  GET,
                  option
                ).json(),
              /**
               * @returns OK
               */
              $get: (
                option?:
                  | { query?: Methods17['get']['query'] | undefined; config?: T | undefined }
                  | undefined
              ) =>
                fetch<Methods17['get']['resBody'], BasicHeaders, Methods17['get']['status']>(
                  prefix,
                  prefix3,
                  GET,
                  option
                )
                  .json()
                  .then(r => r.body),
              /**
               * @returns OK
               */
              post: (option: { body: Methods17['post']['reqBody']; config?: T | undefined }) =>
                fetch<Methods17['post']['resBody'], BasicHeaders, Methods17['post']['status']>(
                  prefix,
                  prefix3,
                  POST,
                  option,
                  'URLSearchParams'
                ).json(),
              /**
               * @returns OK
               */
              $post: (option: { body: Methods17['post']['reqBody']; config?: T | undefined }) =>
                fetch<Methods17['post']['resBody'], BasicHeaders, Methods17['post']['status']>(
                  prefix,
                  prefix3,
                  POST,
                  option,
                  'URLSearchParams'
                )
                  .json()
                  .then(r => r.body),
              /**
               * @returns OK
               */
              put: (option: { body: Methods17['put']['reqBody']; config?: T | undefined }) =>
                fetch<Methods17['put']['resBody'], BasicHeaders, Methods17['put']['status']>(
                  prefix,
                  prefix3,
                  PUT,
                  option,
                  'URLSearchParams'
                ).json(),
              /**
               * @returns OK
               */
              $put: (option: { body: Methods17['put']['reqBody']; config?: T | undefined }) =>
                fetch<Methods17['put']['resBody'], BasicHeaders, Methods17['put']['status']>(
                  prefix,
                  prefix3,
                  PUT,
                  option,
                  'URLSearchParams'
                )
                  .json()
                  .then(r => r.body),
              /**
               * @returns OK
               */
              patch: (option: { body: Methods17['patch']['reqBody']; config?: T | undefined }) =>
                fetch<Methods17['patch']['resBody'], BasicHeaders, Methods17['patch']['status']>(
                  prefix,
                  prefix3,
                  PATCH,
                  option,
                  'URLSearchParams'
                ).json(),
              /**
               * @returns OK
               */
              $patch: (option: { body: Methods17['patch']['reqBody']; config?: T | undefined }) =>
                fetch<Methods17['patch']['resBody'], BasicHeaders, Methods17['patch']['status']>(
                  prefix,
                  prefix3,
                  PATCH,
                  option,
                  'URLSearchParams'
                )
                  .json()
                  .then(r => r.body),
              /**
               * @returns OK
               */
              delete: (option: { body: Methods17['delete']['reqBody']; config?: T | undefined }) =>
                fetch<Methods17['delete']['resBody'], BasicHeaders, Methods17['delete']['status']>(
                  prefix,
                  prefix3,
                  DELETE,
                  option,
                  'URLSearchParams'
                ).json(),
              /**
               * @returns OK
               */
              $delete: (option: { body: Methods17['delete']['reqBody']; config?: T | undefined }) =>
                fetch<Methods17['delete']['resBody'], BasicHeaders, Methods17['delete']['status']>(
                  prefix,
                  prefix3,
                  DELETE,
                  option,
                  'URLSearchParams'
                )
                  .json()
                  .then(r => r.body),
              $path: (
                option?:
                  | { method?: 'get' | undefined; query: Methods17['get']['query'] }
                  | undefined
              ) =>
                `${prefix}${prefix3}${
                  option && option.query ? `?${dataToURLString(option.query)}` : ''
                }`,
            }
          },
          /**
           * @returns OK
           */
          get: (
            option?:
              | { query?: Methods16['get']['query'] | undefined; config?: T | undefined }
              | undefined
          ) =>
            fetch<Methods16['get']['resBody'], BasicHeaders, Methods16['get']['status']>(
              prefix,
              PATH10,
              GET,
              option
            ).json(),
          /**
           * @returns OK
           */
          $get: (
            option?:
              | { query?: Methods16['get']['query'] | undefined; config?: T | undefined }
              | undefined
          ) =>
            fetch<Methods16['get']['resBody'], BasicHeaders, Methods16['get']['status']>(
              prefix,
              PATH10,
              GET,
              option
            )
              .json()
              .then(r => r.body),
          /**
           * @returns OK
           */
          post: (option: { body: Methods16['post']['reqBody']; config?: T | undefined }) =>
            fetch<Methods16['post']['resBody'], BasicHeaders, Methods16['post']['status']>(
              prefix,
              PATH10,
              POST,
              option,
              'URLSearchParams'
            ).json(),
          /**
           * @returns OK
           */
          $post: (option: { body: Methods16['post']['reqBody']; config?: T | undefined }) =>
            fetch<Methods16['post']['resBody'], BasicHeaders, Methods16['post']['status']>(
              prefix,
              PATH10,
              POST,
              option,
              'URLSearchParams'
            )
              .json()
              .then(r => r.body),
          $path: (
            option?: { method?: 'get' | undefined; query: Methods16['get']['query'] } | undefined
          ) =>
            `${prefix}${PATH10}${
              option && option.query ? `?${dataToURLString(option.query)}` : ''
            }`,
        },
        global_styles: {
          _id: (val3: string) => {
            const prefix3 = `${PATH11}/${val3}`

            return {
              /**
               * @returns OK
               */
              get: (option?: { config?: T | undefined } | undefined) =>
                fetch<Methods18['get']['resBody'], BasicHeaders, Methods18['get']['status']>(
                  prefix,
                  prefix3,
                  GET,
                  option
                ).json(),
              /**
               * @returns OK
               */
              $get: (option?: { config?: T | undefined } | undefined) =>
                fetch<Methods18['get']['resBody'], BasicHeaders, Methods18['get']['status']>(
                  prefix,
                  prefix3,
                  GET,
                  option
                )
                  .json()
                  .then(r => r.body),
              /**
               * @returns OK
               */
              post: (option: { body: Methods18['post']['reqBody']; config?: T | undefined }) =>
                fetch<Methods18['post']['resBody'], BasicHeaders, Methods18['post']['status']>(
                  prefix,
                  prefix3,
                  POST,
                  option,
                  'URLSearchParams'
                ).json(),
              /**
               * @returns OK
               */
              $post: (option: { body: Methods18['post']['reqBody']; config?: T | undefined }) =>
                fetch<Methods18['post']['resBody'], BasicHeaders, Methods18['post']['status']>(
                  prefix,
                  prefix3,
                  POST,
                  option,
                  'URLSearchParams'
                )
                  .json()
                  .then(r => r.body),
              /**
               * @returns OK
               */
              put: (option: { body: Methods18['put']['reqBody']; config?: T | undefined }) =>
                fetch<Methods18['put']['resBody'], BasicHeaders, Methods18['put']['status']>(
                  prefix,
                  prefix3,
                  PUT,
                  option,
                  'URLSearchParams'
                ).json(),
              /**
               * @returns OK
               */
              $put: (option: { body: Methods18['put']['reqBody']; config?: T | undefined }) =>
                fetch<Methods18['put']['resBody'], BasicHeaders, Methods18['put']['status']>(
                  prefix,
                  prefix3,
                  PUT,
                  option,
                  'URLSearchParams'
                )
                  .json()
                  .then(r => r.body),
              /**
               * @returns OK
               */
              patch: (option: { body: Methods18['patch']['reqBody']; config?: T | undefined }) =>
                fetch<Methods18['patch']['resBody'], BasicHeaders, Methods18['patch']['status']>(
                  prefix,
                  prefix3,
                  PATCH,
                  option,
                  'URLSearchParams'
                ).json(),
              /**
               * @returns OK
               */
              $patch: (option: { body: Methods18['patch']['reqBody']; config?: T | undefined }) =>
                fetch<Methods18['patch']['resBody'], BasicHeaders, Methods18['patch']['status']>(
                  prefix,
                  prefix3,
                  PATCH,
                  option,
                  'URLSearchParams'
                )
                  .json()
                  .then(r => r.body),
              $path: () => `${prefix}${prefix3}`,
            }
          },
          themes: {
            _stylesheet: (val4: string) => {
              const prefix4 = `${PATH12}/${val4}`

              return {
                variations: {
                  get: (option?: { config?: T | undefined } | undefined) =>
                    fetch<void, BasicHeaders, Methods20['get']['status']>(
                      prefix,
                      `${prefix4}${PATH13}`,
                      GET,
                      option
                    ).send(),
                  $get: (option?: { config?: T | undefined } | undefined) =>
                    fetch<void, BasicHeaders, Methods20['get']['status']>(
                      prefix,
                      `${prefix4}${PATH13}`,
                      GET,
                      option
                    )
                      .send()
                      .then(r => r.body),
                  $path: () => `${prefix}${prefix4}${PATH13}`,
                },
                get: (option?: { config?: T | undefined } | undefined) =>
                  fetch<void, BasicHeaders, Methods19['get']['status']>(
                    prefix,
                    prefix4,
                    GET,
                    option
                  ).send(),
                $get: (option?: { config?: T | undefined } | undefined) =>
                  fetch<void, BasicHeaders, Methods19['get']['status']>(
                    prefix,
                    prefix4,
                    GET,
                    option
                  )
                    .send()
                    .then(r => r.body),
                $path: () => `${prefix}${prefix4}`,
              }
            },
          },
        },
        media: {
          _id: (val3: string) => {
            const prefix3 = `${PATH14}/${val3}`

            return {
              edit: {
                post: (option: { body: Methods23['post']['reqBody']; config?: T | undefined }) =>
                  fetch<void, BasicHeaders, Methods23['post']['status']>(
                    prefix,
                    `${prefix3}${PATH15}`,
                    POST,
                    option,
                    'URLSearchParams'
                  ).send(),
                $post: (option: { body: Methods23['post']['reqBody']; config?: T | undefined }) =>
                  fetch<void, BasicHeaders, Methods23['post']['status']>(
                    prefix,
                    `${prefix3}${PATH15}`,
                    POST,
                    option,
                    'URLSearchParams'
                  )
                    .send()
                    .then(r => r.body),
                $path: () => `${prefix}${prefix3}${PATH15}`,
              },
              post_process: {
                post: (option: { body: Methods24['post']['reqBody']; config?: T | undefined }) =>
                  fetch<void, BasicHeaders, Methods24['post']['status']>(
                    prefix,
                    `${prefix3}${PATH16}`,
                    POST,
                    option,
                    'URLSearchParams'
                  ).send(),
                $post: (option: { body: Methods24['post']['reqBody']; config?: T | undefined }) =>
                  fetch<void, BasicHeaders, Methods24['post']['status']>(
                    prefix,
                    `${prefix3}${PATH16}`,
                    POST,
                    option,
                    'URLSearchParams'
                  )
                    .send()
                    .then(r => r.body),
                $path: () => `${prefix}${prefix3}${PATH16}`,
              },
              /**
               * @returns OK
               */
              get: (
                option?:
                  | { query?: Methods22['get']['query'] | undefined; config?: T | undefined }
                  | undefined
              ) =>
                fetch<Methods22['get']['resBody'], BasicHeaders, Methods22['get']['status']>(
                  prefix,
                  prefix3,
                  GET,
                  option
                ).json(),
              /**
               * @returns OK
               */
              $get: (
                option?:
                  | { query?: Methods22['get']['query'] | undefined; config?: T | undefined }
                  | undefined
              ) =>
                fetch<Methods22['get']['resBody'], BasicHeaders, Methods22['get']['status']>(
                  prefix,
                  prefix3,
                  GET,
                  option
                )
                  .json()
                  .then(r => r.body),
              /**
               * @returns OK
               */
              post: (option: { body: Methods22['post']['reqBody']; config?: T | undefined }) =>
                fetch<Methods22['post']['resBody'], BasicHeaders, Methods22['post']['status']>(
                  prefix,
                  prefix3,
                  POST,
                  option,
                  'URLSearchParams'
                ).json(),
              /**
               * @returns OK
               */
              $post: (option: { body: Methods22['post']['reqBody']; config?: T | undefined }) =>
                fetch<Methods22['post']['resBody'], BasicHeaders, Methods22['post']['status']>(
                  prefix,
                  prefix3,
                  POST,
                  option,
                  'URLSearchParams'
                )
                  .json()
                  .then(r => r.body),
              /**
               * @returns OK
               */
              put: (option: { body: Methods22['put']['reqBody']; config?: T | undefined }) =>
                fetch<Methods22['put']['resBody'], BasicHeaders, Methods22['put']['status']>(
                  prefix,
                  prefix3,
                  PUT,
                  option,
                  'URLSearchParams'
                ).json(),
              /**
               * @returns OK
               */
              $put: (option: { body: Methods22['put']['reqBody']; config?: T | undefined }) =>
                fetch<Methods22['put']['resBody'], BasicHeaders, Methods22['put']['status']>(
                  prefix,
                  prefix3,
                  PUT,
                  option,
                  'URLSearchParams'
                )
                  .json()
                  .then(r => r.body),
              /**
               * @returns OK
               */
              patch: (option: { body: Methods22['patch']['reqBody']; config?: T | undefined }) =>
                fetch<Methods22['patch']['resBody'], BasicHeaders, Methods22['patch']['status']>(
                  prefix,
                  prefix3,
                  PATCH,
                  option,
                  'URLSearchParams'
                ).json(),
              /**
               * @returns OK
               */
              $patch: (option: { body: Methods22['patch']['reqBody']; config?: T | undefined }) =>
                fetch<Methods22['patch']['resBody'], BasicHeaders, Methods22['patch']['status']>(
                  prefix,
                  prefix3,
                  PATCH,
                  option,
                  'URLSearchParams'
                )
                  .json()
                  .then(r => r.body),
              /**
               * @returns OK
               */
              delete: (option: { body: Methods22['delete']['reqBody']; config?: T | undefined }) =>
                fetch<Methods22['delete']['resBody'], BasicHeaders, Methods22['delete']['status']>(
                  prefix,
                  prefix3,
                  DELETE,
                  option,
                  'URLSearchParams'
                ).json(),
              /**
               * @returns OK
               */
              $delete: (option: { body: Methods22['delete']['reqBody']; config?: T | undefined }) =>
                fetch<Methods22['delete']['resBody'], BasicHeaders, Methods22['delete']['status']>(
                  prefix,
                  prefix3,
                  DELETE,
                  option,
                  'URLSearchParams'
                )
                  .json()
                  .then(r => r.body),
              $path: (
                option?:
                  | { method?: 'get' | undefined; query: Methods22['get']['query'] }
                  | undefined
              ) =>
                `${prefix}${prefix3}${
                  option && option.query ? `?${dataToURLString(option.query)}` : ''
                }`,
            }
          },
          /**
           * @returns OK
           */
          get: (
            option?:
              | { query?: Methods21['get']['query'] | undefined; config?: T | undefined }
              | undefined
          ) =>
            fetch<Methods21['get']['resBody'], BasicHeaders, Methods21['get']['status']>(
              prefix,
              PATH14,
              GET,
              option
            ).json(),
          /**
           * @returns OK
           */
          $get: (
            option?:
              | { query?: Methods21['get']['query'] | undefined; config?: T | undefined }
              | undefined
          ) =>
            fetch<Methods21['get']['resBody'], BasicHeaders, Methods21['get']['status']>(
              prefix,
              PATH14,
              GET,
              option
            )
              .json()
              .then(r => r.body),
          /**
           * @returns OK
           */
          post: (option: { body: Methods21['post']['reqBody']; config?: T | undefined }) =>
            fetch<Methods21['post']['resBody'], BasicHeaders, Methods21['post']['status']>(
              prefix,
              PATH14,
              POST,
              option,
              'URLSearchParams'
            ).json(),
          /**
           * @returns OK
           */
          $post: (option: { body: Methods21['post']['reqBody']; config?: T | undefined }) =>
            fetch<Methods21['post']['resBody'], BasicHeaders, Methods21['post']['status']>(
              prefix,
              PATH14,
              POST,
              option,
              'URLSearchParams'
            )
              .json()
              .then(r => r.body),
          $path: (
            option?: { method?: 'get' | undefined; query: Methods21['get']['query'] } | undefined
          ) =>
            `${prefix}${PATH14}${
              option && option.query ? `?${dataToURLString(option.query)}` : ''
            }`,
        },
        menu_items: {
          _id: (val3: string) => {
            const prefix3 = `${PATH17}/${val3}`

            return {
              autosaves: {
                /**
                 * @returns OK
                 */
                get: (
                  option?:
                    | { query?: Methods27['get']['query'] | undefined; config?: T | undefined }
                    | undefined
                ) =>
                  fetch<Methods27['get']['resBody'], BasicHeaders, Methods27['get']['status']>(
                    prefix,
                    `${prefix3}${PATH7}`,
                    GET,
                    option
                  ).json(),
                /**
                 * @returns OK
                 */
                $get: (
                  option?:
                    | { query?: Methods27['get']['query'] | undefined; config?: T | undefined }
                    | undefined
                ) =>
                  fetch<Methods27['get']['resBody'], BasicHeaders, Methods27['get']['status']>(
                    prefix,
                    `${prefix3}${PATH7}`,
                    GET,
                    option
                  )
                    .json()
                    .then(r => r.body),
                /**
                 * @returns OK
                 */
                post: (option: { body: Methods27['post']['reqBody']; config?: T | undefined }) =>
                  fetch<Methods27['post']['resBody'], BasicHeaders, Methods27['post']['status']>(
                    prefix,
                    `${prefix3}${PATH7}`,
                    POST,
                    option,
                    'URLSearchParams'
                  ).json(),
                /**
                 * @returns OK
                 */
                $post: (option: { body: Methods27['post']['reqBody']; config?: T | undefined }) =>
                  fetch<Methods27['post']['resBody'], BasicHeaders, Methods27['post']['status']>(
                    prefix,
                    `${prefix3}${PATH7}`,
                    POST,
                    option,
                    'URLSearchParams'
                  )
                    .json()
                    .then(r => r.body),
                $path: (
                  option?:
                    | { method?: 'get' | undefined; query: Methods27['get']['query'] }
                    | undefined
                ) =>
                  `${prefix}${prefix3}${PATH7}${
                    option && option.query ? `?${dataToURLString(option.query)}` : ''
                  }`,
              },
              /**
               * @returns OK
               */
              get: (
                option?:
                  | { query?: Methods26['get']['query'] | undefined; config?: T | undefined }
                  | undefined
              ) =>
                fetch<Methods26['get']['resBody'], BasicHeaders, Methods26['get']['status']>(
                  prefix,
                  prefix3,
                  GET,
                  option
                ).json(),
              /**
               * @returns OK
               */
              $get: (
                option?:
                  | { query?: Methods26['get']['query'] | undefined; config?: T | undefined }
                  | undefined
              ) =>
                fetch<Methods26['get']['resBody'], BasicHeaders, Methods26['get']['status']>(
                  prefix,
                  prefix3,
                  GET,
                  option
                )
                  .json()
                  .then(r => r.body),
              /**
               * @returns OK
               */
              post: (option: { body: Methods26['post']['reqBody']; config?: T | undefined }) =>
                fetch<Methods26['post']['resBody'], BasicHeaders, Methods26['post']['status']>(
                  prefix,
                  prefix3,
                  POST,
                  option,
                  'URLSearchParams'
                ).json(),
              /**
               * @returns OK
               */
              $post: (option: { body: Methods26['post']['reqBody']; config?: T | undefined }) =>
                fetch<Methods26['post']['resBody'], BasicHeaders, Methods26['post']['status']>(
                  prefix,
                  prefix3,
                  POST,
                  option,
                  'URLSearchParams'
                )
                  .json()
                  .then(r => r.body),
              /**
               * @returns OK
               */
              put: (option: { body: Methods26['put']['reqBody']; config?: T | undefined }) =>
                fetch<Methods26['put']['resBody'], BasicHeaders, Methods26['put']['status']>(
                  prefix,
                  prefix3,
                  PUT,
                  option,
                  'URLSearchParams'
                ).json(),
              /**
               * @returns OK
               */
              $put: (option: { body: Methods26['put']['reqBody']; config?: T | undefined }) =>
                fetch<Methods26['put']['resBody'], BasicHeaders, Methods26['put']['status']>(
                  prefix,
                  prefix3,
                  PUT,
                  option,
                  'URLSearchParams'
                )
                  .json()
                  .then(r => r.body),
              /**
               * @returns OK
               */
              patch: (option: { body: Methods26['patch']['reqBody']; config?: T | undefined }) =>
                fetch<Methods26['patch']['resBody'], BasicHeaders, Methods26['patch']['status']>(
                  prefix,
                  prefix3,
                  PATCH,
                  option,
                  'URLSearchParams'
                ).json(),
              /**
               * @returns OK
               */
              $patch: (option: { body: Methods26['patch']['reqBody']; config?: T | undefined }) =>
                fetch<Methods26['patch']['resBody'], BasicHeaders, Methods26['patch']['status']>(
                  prefix,
                  prefix3,
                  PATCH,
                  option,
                  'URLSearchParams'
                )
                  .json()
                  .then(r => r.body),
              /**
               * @returns OK
               */
              delete: (option: { body: Methods26['delete']['reqBody']; config?: T | undefined }) =>
                fetch<Methods26['delete']['resBody'], BasicHeaders, Methods26['delete']['status']>(
                  prefix,
                  prefix3,
                  DELETE,
                  option,
                  'URLSearchParams'
                ).json(),
              /**
               * @returns OK
               */
              $delete: (option: { body: Methods26['delete']['reqBody']; config?: T | undefined }) =>
                fetch<Methods26['delete']['resBody'], BasicHeaders, Methods26['delete']['status']>(
                  prefix,
                  prefix3,
                  DELETE,
                  option,
                  'URLSearchParams'
                )
                  .json()
                  .then(r => r.body),
              $path: (
                option?:
                  | { method?: 'get' | undefined; query: Methods26['get']['query'] }
                  | undefined
              ) =>
                `${prefix}${prefix3}${
                  option && option.query ? `?${dataToURLString(option.query)}` : ''
                }`,
            }
          },
          _parent: (val3: string) => {
            const prefix3 = `${PATH17}/${val3}`

            return {
              autosaves: {
                _id: (val5: string) => {
                  const prefix5 = `${prefix3}${PATH7}/${val5}`

                  return {
                    /**
                     * @returns OK
                     */
                    get: (
                      option?:
                        | { query?: Methods28['get']['query'] | undefined; config?: T | undefined }
                        | undefined
                    ) =>
                      fetch<Methods28['get']['resBody'], BasicHeaders, Methods28['get']['status']>(
                        prefix,
                        prefix5,
                        GET,
                        option
                      ).json(),
                    /**
                     * @returns OK
                     */
                    $get: (
                      option?:
                        | { query?: Methods28['get']['query'] | undefined; config?: T | undefined }
                        | undefined
                    ) =>
                      fetch<Methods28['get']['resBody'], BasicHeaders, Methods28['get']['status']>(
                        prefix,
                        prefix5,
                        GET,
                        option
                      )
                        .json()
                        .then(r => r.body),
                    $path: (
                      option?:
                        | { method?: 'get' | undefined; query: Methods28['get']['query'] }
                        | undefined
                    ) =>
                      `${prefix}${prefix5}${
                        option && option.query ? `?${dataToURLString(option.query)}` : ''
                      }`,
                  }
                },
              },
            }
          },
          /**
           * @returns OK
           */
          get: (
            option?:
              | { query?: Methods25['get']['query'] | undefined; config?: T | undefined }
              | undefined
          ) =>
            fetch<Methods25['get']['resBody'], BasicHeaders, Methods25['get']['status']>(
              prefix,
              PATH17,
              GET,
              option
            ).json(),
          /**
           * @returns OK
           */
          $get: (
            option?:
              | { query?: Methods25['get']['query'] | undefined; config?: T | undefined }
              | undefined
          ) =>
            fetch<Methods25['get']['resBody'], BasicHeaders, Methods25['get']['status']>(
              prefix,
              PATH17,
              GET,
              option
            )
              .json()
              .then(r => r.body),
          /**
           * @returns OK
           */
          post: (option: { body: Methods25['post']['reqBody']; config?: T | undefined }) =>
            fetch<Methods25['post']['resBody'], BasicHeaders, Methods25['post']['status']>(
              prefix,
              PATH17,
              POST,
              option,
              'URLSearchParams'
            ).json(),
          /**
           * @returns OK
           */
          $post: (option: { body: Methods25['post']['reqBody']; config?: T | undefined }) =>
            fetch<Methods25['post']['resBody'], BasicHeaders, Methods25['post']['status']>(
              prefix,
              PATH17,
              POST,
              option,
              'URLSearchParams'
            )
              .json()
              .then(r => r.body),
          $path: (
            option?: { method?: 'get' | undefined; query: Methods25['get']['query'] } | undefined
          ) =>
            `${prefix}${PATH17}${
              option && option.query ? `?${dataToURLString(option.query)}` : ''
            }`,
        },
        menu_locations: {
          _location: (val3: string) => {
            const prefix3 = `${PATH18}/${val3}`

            return {
              /**
               * @returns OK
               */
              get: (
                option?:
                  | { query?: Methods30['get']['query'] | undefined; config?: T | undefined }
                  | undefined
              ) =>
                fetch<Methods30['get']['resBody'], BasicHeaders, Methods30['get']['status']>(
                  prefix,
                  prefix3,
                  GET,
                  option
                ).json(),
              /**
               * @returns OK
               */
              $get: (
                option?:
                  | { query?: Methods30['get']['query'] | undefined; config?: T | undefined }
                  | undefined
              ) =>
                fetch<Methods30['get']['resBody'], BasicHeaders, Methods30['get']['status']>(
                  prefix,
                  prefix3,
                  GET,
                  option
                )
                  .json()
                  .then(r => r.body),
              $path: (
                option?:
                  | { method?: 'get' | undefined; query: Methods30['get']['query'] }
                  | undefined
              ) =>
                `${prefix}${prefix3}${
                  option && option.query ? `?${dataToURLString(option.query)}` : ''
                }`,
            }
          },
          /**
           * @returns OK
           */
          get: (
            option?:
              | { query?: Methods29['get']['query'] | undefined; config?: T | undefined }
              | undefined
          ) =>
            fetch<Methods29['get']['resBody'], BasicHeaders, Methods29['get']['status']>(
              prefix,
              PATH18,
              GET,
              option
            ).json(),
          /**
           * @returns OK
           */
          $get: (
            option?:
              | { query?: Methods29['get']['query'] | undefined; config?: T | undefined }
              | undefined
          ) =>
            fetch<Methods29['get']['resBody'], BasicHeaders, Methods29['get']['status']>(
              prefix,
              PATH18,
              GET,
              option
            )
              .json()
              .then(r => r.body),
          $path: (
            option?: { method?: 'get' | undefined; query: Methods29['get']['query'] } | undefined
          ) =>
            `${prefix}${PATH18}${
              option && option.query ? `?${dataToURLString(option.query)}` : ''
            }`,
        },
        menus: {
          _id: (val3: string) => {
            const prefix3 = `${PATH19}/${val3}`

            return {
              /**
               * @returns OK
               */
              get: (
                option?:
                  | { query?: Methods32['get']['query'] | undefined; config?: T | undefined }
                  | undefined
              ) =>
                fetch<Methods32['get']['resBody'], BasicHeaders, Methods32['get']['status']>(
                  prefix,
                  prefix3,
                  GET,
                  option
                ).json(),
              /**
               * @returns OK
               */
              $get: (
                option?:
                  | { query?: Methods32['get']['query'] | undefined; config?: T | undefined }
                  | undefined
              ) =>
                fetch<Methods32['get']['resBody'], BasicHeaders, Methods32['get']['status']>(
                  prefix,
                  prefix3,
                  GET,
                  option
                )
                  .json()
                  .then(r => r.body),
              /**
               * @returns OK
               */
              post: (option: { body: Methods32['post']['reqBody']; config?: T | undefined }) =>
                fetch<Methods32['post']['resBody'], BasicHeaders, Methods32['post']['status']>(
                  prefix,
                  prefix3,
                  POST,
                  option,
                  'URLSearchParams'
                ).json(),
              /**
               * @returns OK
               */
              $post: (option: { body: Methods32['post']['reqBody']; config?: T | undefined }) =>
                fetch<Methods32['post']['resBody'], BasicHeaders, Methods32['post']['status']>(
                  prefix,
                  prefix3,
                  POST,
                  option,
                  'URLSearchParams'
                )
                  .json()
                  .then(r => r.body),
              /**
               * @returns OK
               */
              put: (option: { body: Methods32['put']['reqBody']; config?: T | undefined }) =>
                fetch<Methods32['put']['resBody'], BasicHeaders, Methods32['put']['status']>(
                  prefix,
                  prefix3,
                  PUT,
                  option,
                  'URLSearchParams'
                ).json(),
              /**
               * @returns OK
               */
              $put: (option: { body: Methods32['put']['reqBody']; config?: T | undefined }) =>
                fetch<Methods32['put']['resBody'], BasicHeaders, Methods32['put']['status']>(
                  prefix,
                  prefix3,
                  PUT,
                  option,
                  'URLSearchParams'
                )
                  .json()
                  .then(r => r.body),
              /**
               * @returns OK
               */
              patch: (option: { body: Methods32['patch']['reqBody']; config?: T | undefined }) =>
                fetch<Methods32['patch']['resBody'], BasicHeaders, Methods32['patch']['status']>(
                  prefix,
                  prefix3,
                  PATCH,
                  option,
                  'URLSearchParams'
                ).json(),
              /**
               * @returns OK
               */
              $patch: (option: { body: Methods32['patch']['reqBody']; config?: T | undefined }) =>
                fetch<Methods32['patch']['resBody'], BasicHeaders, Methods32['patch']['status']>(
                  prefix,
                  prefix3,
                  PATCH,
                  option,
                  'URLSearchParams'
                )
                  .json()
                  .then(r => r.body),
              /**
               * @returns OK
               */
              delete: (option: { body: Methods32['delete']['reqBody']; config?: T | undefined }) =>
                fetch<Methods32['delete']['resBody'], BasicHeaders, Methods32['delete']['status']>(
                  prefix,
                  prefix3,
                  DELETE,
                  option,
                  'URLSearchParams'
                ).json(),
              /**
               * @returns OK
               */
              $delete: (option: { body: Methods32['delete']['reqBody']; config?: T | undefined }) =>
                fetch<Methods32['delete']['resBody'], BasicHeaders, Methods32['delete']['status']>(
                  prefix,
                  prefix3,
                  DELETE,
                  option,
                  'URLSearchParams'
                )
                  .json()
                  .then(r => r.body),
              $path: (
                option?:
                  | { method?: 'get' | undefined; query: Methods32['get']['query'] }
                  | undefined
              ) =>
                `${prefix}${prefix3}${
                  option && option.query ? `?${dataToURLString(option.query)}` : ''
                }`,
            }
          },
          /**
           * @returns OK
           */
          get: (
            option?:
              | { query?: Methods31['get']['query'] | undefined; config?: T | undefined }
              | undefined
          ) =>
            fetch<Methods31['get']['resBody'], BasicHeaders, Methods31['get']['status']>(
              prefix,
              PATH19,
              GET,
              option
            ).json(),
          /**
           * @returns OK
           */
          $get: (
            option?:
              | { query?: Methods31['get']['query'] | undefined; config?: T | undefined }
              | undefined
          ) =>
            fetch<Methods31['get']['resBody'], BasicHeaders, Methods31['get']['status']>(
              prefix,
              PATH19,
              GET,
              option
            )
              .json()
              .then(r => r.body),
          /**
           * @returns OK
           */
          post: (option: { body: Methods31['post']['reqBody']; config?: T | undefined }) =>
            fetch<Methods31['post']['resBody'], BasicHeaders, Methods31['post']['status']>(
              prefix,
              PATH19,
              POST,
              option,
              'URLSearchParams'
            ).json(),
          /**
           * @returns OK
           */
          $post: (option: { body: Methods31['post']['reqBody']; config?: T | undefined }) =>
            fetch<Methods31['post']['resBody'], BasicHeaders, Methods31['post']['status']>(
              prefix,
              PATH19,
              POST,
              option,
              'URLSearchParams'
            )
              .json()
              .then(r => r.body),
          $path: (
            option?: { method?: 'get' | undefined; query: Methods31['get']['query'] } | undefined
          ) =>
            `${prefix}${PATH19}${
              option && option.query ? `?${dataToURLString(option.query)}` : ''
            }`,
        },
        navigation: {
          _id: (val3: string) => {
            const prefix3 = `${PATH20}/${val3}`

            return {
              autosaves: {
                /**
                 * @returns OK
                 */
                get: (
                  option?:
                    | { query?: Methods35['get']['query'] | undefined; config?: T | undefined }
                    | undefined
                ) =>
                  fetch<Methods35['get']['resBody'], BasicHeaders, Methods35['get']['status']>(
                    prefix,
                    `${prefix3}${PATH7}`,
                    GET,
                    option
                  ).json(),
                /**
                 * @returns OK
                 */
                $get: (
                  option?:
                    | { query?: Methods35['get']['query'] | undefined; config?: T | undefined }
                    | undefined
                ) =>
                  fetch<Methods35['get']['resBody'], BasicHeaders, Methods35['get']['status']>(
                    prefix,
                    `${prefix3}${PATH7}`,
                    GET,
                    option
                  )
                    .json()
                    .then(r => r.body),
                /**
                 * @returns OK
                 */
                post: (option: { body: Methods35['post']['reqBody']; config?: T | undefined }) =>
                  fetch<Methods35['post']['resBody'], BasicHeaders, Methods35['post']['status']>(
                    prefix,
                    `${prefix3}${PATH7}`,
                    POST,
                    option,
                    'URLSearchParams'
                  ).json(),
                /**
                 * @returns OK
                 */
                $post: (option: { body: Methods35['post']['reqBody']; config?: T | undefined }) =>
                  fetch<Methods35['post']['resBody'], BasicHeaders, Methods35['post']['status']>(
                    prefix,
                    `${prefix3}${PATH7}`,
                    POST,
                    option,
                    'URLSearchParams'
                  )
                    .json()
                    .then(r => r.body),
                $path: (
                  option?:
                    | { method?: 'get' | undefined; query: Methods35['get']['query'] }
                    | undefined
                ) =>
                  `${prefix}${prefix3}${PATH7}${
                    option && option.query ? `?${dataToURLString(option.query)}` : ''
                  }`,
              },
              /**
               * @returns OK
               */
              get: (
                option?:
                  | { query?: Methods34['get']['query'] | undefined; config?: T | undefined }
                  | undefined
              ) =>
                fetch<Methods34['get']['resBody'], BasicHeaders, Methods34['get']['status']>(
                  prefix,
                  prefix3,
                  GET,
                  option
                ).json(),
              /**
               * @returns OK
               */
              $get: (
                option?:
                  | { query?: Methods34['get']['query'] | undefined; config?: T | undefined }
                  | undefined
              ) =>
                fetch<Methods34['get']['resBody'], BasicHeaders, Methods34['get']['status']>(
                  prefix,
                  prefix3,
                  GET,
                  option
                )
                  .json()
                  .then(r => r.body),
              /**
               * @returns OK
               */
              post: (option: { body: Methods34['post']['reqBody']; config?: T | undefined }) =>
                fetch<Methods34['post']['resBody'], BasicHeaders, Methods34['post']['status']>(
                  prefix,
                  prefix3,
                  POST,
                  option,
                  'URLSearchParams'
                ).json(),
              /**
               * @returns OK
               */
              $post: (option: { body: Methods34['post']['reqBody']; config?: T | undefined }) =>
                fetch<Methods34['post']['resBody'], BasicHeaders, Methods34['post']['status']>(
                  prefix,
                  prefix3,
                  POST,
                  option,
                  'URLSearchParams'
                )
                  .json()
                  .then(r => r.body),
              /**
               * @returns OK
               */
              put: (option: { body: Methods34['put']['reqBody']; config?: T | undefined }) =>
                fetch<Methods34['put']['resBody'], BasicHeaders, Methods34['put']['status']>(
                  prefix,
                  prefix3,
                  PUT,
                  option,
                  'URLSearchParams'
                ).json(),
              /**
               * @returns OK
               */
              $put: (option: { body: Methods34['put']['reqBody']; config?: T | undefined }) =>
                fetch<Methods34['put']['resBody'], BasicHeaders, Methods34['put']['status']>(
                  prefix,
                  prefix3,
                  PUT,
                  option,
                  'URLSearchParams'
                )
                  .json()
                  .then(r => r.body),
              /**
               * @returns OK
               */
              patch: (option: { body: Methods34['patch']['reqBody']; config?: T | undefined }) =>
                fetch<Methods34['patch']['resBody'], BasicHeaders, Methods34['patch']['status']>(
                  prefix,
                  prefix3,
                  PATCH,
                  option,
                  'URLSearchParams'
                ).json(),
              /**
               * @returns OK
               */
              $patch: (option: { body: Methods34['patch']['reqBody']; config?: T | undefined }) =>
                fetch<Methods34['patch']['resBody'], BasicHeaders, Methods34['patch']['status']>(
                  prefix,
                  prefix3,
                  PATCH,
                  option,
                  'URLSearchParams'
                )
                  .json()
                  .then(r => r.body),
              /**
               * @returns OK
               */
              delete: (option: { body: Methods34['delete']['reqBody']; config?: T | undefined }) =>
                fetch<Methods34['delete']['resBody'], BasicHeaders, Methods34['delete']['status']>(
                  prefix,
                  prefix3,
                  DELETE,
                  option,
                  'URLSearchParams'
                ).json(),
              /**
               * @returns OK
               */
              $delete: (option: { body: Methods34['delete']['reqBody']; config?: T | undefined }) =>
                fetch<Methods34['delete']['resBody'], BasicHeaders, Methods34['delete']['status']>(
                  prefix,
                  prefix3,
                  DELETE,
                  option,
                  'URLSearchParams'
                )
                  .json()
                  .then(r => r.body),
              $path: (
                option?:
                  | { method?: 'get' | undefined; query: Methods34['get']['query'] }
                  | undefined
              ) =>
                `${prefix}${prefix3}${
                  option && option.query ? `?${dataToURLString(option.query)}` : ''
                }`,
            }
          },
          _parent: (val3: string) => {
            const prefix3 = `${PATH20}/${val3}`

            return {
              autosaves: {
                _id: (val5: string) => {
                  const prefix5 = `${prefix3}${PATH7}/${val5}`

                  return {
                    /**
                     * @returns OK
                     */
                    get: (
                      option?:
                        | { query?: Methods36['get']['query'] | undefined; config?: T | undefined }
                        | undefined
                    ) =>
                      fetch<Methods36['get']['resBody'], BasicHeaders, Methods36['get']['status']>(
                        prefix,
                        prefix5,
                        GET,
                        option
                      ).json(),
                    /**
                     * @returns OK
                     */
                    $get: (
                      option?:
                        | { query?: Methods36['get']['query'] | undefined; config?: T | undefined }
                        | undefined
                    ) =>
                      fetch<Methods36['get']['resBody'], BasicHeaders, Methods36['get']['status']>(
                        prefix,
                        prefix5,
                        GET,
                        option
                      )
                        .json()
                        .then(r => r.body),
                    $path: (
                      option?:
                        | { method?: 'get' | undefined; query: Methods36['get']['query'] }
                        | undefined
                    ) =>
                      `${prefix}${prefix5}${
                        option && option.query ? `?${dataToURLString(option.query)}` : ''
                      }`,
                  }
                },
              },
              revisions: {
                _id: (val5: string) => {
                  const prefix5 = `${prefix3}${PATH8}/${val5}`

                  return {
                    /**
                     * @returns OK
                     */
                    get: (
                      option?:
                        | { query?: Methods38['get']['query'] | undefined; config?: T | undefined }
                        | undefined
                    ) =>
                      fetch<Methods38['get']['resBody'], BasicHeaders, Methods38['get']['status']>(
                        prefix,
                        prefix5,
                        GET,
                        option
                      ).json(),
                    /**
                     * @returns OK
                     */
                    $get: (
                      option?:
                        | { query?: Methods38['get']['query'] | undefined; config?: T | undefined }
                        | undefined
                    ) =>
                      fetch<Methods38['get']['resBody'], BasicHeaders, Methods38['get']['status']>(
                        prefix,
                        prefix5,
                        GET,
                        option
                      )
                        .json()
                        .then(r => r.body),
                    /**
                     * @returns OK
                     */
                    delete: (option: {
                      body: Methods38['delete']['reqBody']
                      config?: T | undefined
                    }) =>
                      fetch<
                        Methods38['delete']['resBody'],
                        BasicHeaders,
                        Methods38['delete']['status']
                      >(prefix, prefix5, DELETE, option, 'URLSearchParams').json(),
                    /**
                     * @returns OK
                     */
                    $delete: (option: {
                      body: Methods38['delete']['reqBody']
                      config?: T | undefined
                    }) =>
                      fetch<
                        Methods38['delete']['resBody'],
                        BasicHeaders,
                        Methods38['delete']['status']
                      >(prefix, prefix5, DELETE, option, 'URLSearchParams')
                        .json()
                        .then(r => r.body),
                    $path: (
                      option?:
                        | { method?: 'get' | undefined; query: Methods38['get']['query'] }
                        | undefined
                    ) =>
                      `${prefix}${prefix5}${
                        option && option.query ? `?${dataToURLString(option.query)}` : ''
                      }`,
                  }
                },
                /**
                 * @returns OK
                 */
                get: (
                  option?:
                    | { query?: Methods37['get']['query'] | undefined; config?: T | undefined }
                    | undefined
                ) =>
                  fetch<Methods37['get']['resBody'], BasicHeaders, Methods37['get']['status']>(
                    prefix,
                    `${prefix3}${PATH8}`,
                    GET,
                    option
                  ).json(),
                /**
                 * @returns OK
                 */
                $get: (
                  option?:
                    | { query?: Methods37['get']['query'] | undefined; config?: T | undefined }
                    | undefined
                ) =>
                  fetch<Methods37['get']['resBody'], BasicHeaders, Methods37['get']['status']>(
                    prefix,
                    `${prefix3}${PATH8}`,
                    GET,
                    option
                  )
                    .json()
                    .then(r => r.body),
                $path: (
                  option?:
                    | { method?: 'get' | undefined; query: Methods37['get']['query'] }
                    | undefined
                ) =>
                  `${prefix}${prefix3}${PATH8}${
                    option && option.query ? `?${dataToURLString(option.query)}` : ''
                  }`,
              },
            }
          },
          /**
           * @returns OK
           */
          get: (
            option?:
              | { query?: Methods33['get']['query'] | undefined; config?: T | undefined }
              | undefined
          ) =>
            fetch<Methods33['get']['resBody'], BasicHeaders, Methods33['get']['status']>(
              prefix,
              PATH20,
              GET,
              option
            ).json(),
          /**
           * @returns OK
           */
          $get: (
            option?:
              | { query?: Methods33['get']['query'] | undefined; config?: T | undefined }
              | undefined
          ) =>
            fetch<Methods33['get']['resBody'], BasicHeaders, Methods33['get']['status']>(
              prefix,
              PATH20,
              GET,
              option
            )
              .json()
              .then(r => r.body),
          /**
           * @returns OK
           */
          post: (option: { body: Methods33['post']['reqBody']; config?: T | undefined }) =>
            fetch<Methods33['post']['resBody'], BasicHeaders, Methods33['post']['status']>(
              prefix,
              PATH20,
              POST,
              option,
              'URLSearchParams'
            ).json(),
          /**
           * @returns OK
           */
          $post: (option: { body: Methods33['post']['reqBody']; config?: T | undefined }) =>
            fetch<Methods33['post']['resBody'], BasicHeaders, Methods33['post']['status']>(
              prefix,
              PATH20,
              POST,
              option,
              'URLSearchParams'
            )
              .json()
              .then(r => r.body),
          $path: (
            option?: { method?: 'get' | undefined; query: Methods33['get']['query'] } | undefined
          ) =>
            `${prefix}${PATH20}${
              option && option.query ? `?${dataToURLString(option.query)}` : ''
            }`,
        },
        pages: {
          _id: (val3: string) => {
            const prefix3 = `${PATH21}/${val3}`

            return {
              autosaves: {
                /**
                 * @returns OK
                 */
                get: (
                  option?:
                    | { query?: Methods41['get']['query'] | undefined; config?: T | undefined }
                    | undefined
                ) =>
                  fetch<Methods41['get']['resBody'], BasicHeaders, Methods41['get']['status']>(
                    prefix,
                    `${prefix3}${PATH7}`,
                    GET,
                    option
                  ).json(),
                /**
                 * @returns OK
                 */
                $get: (
                  option?:
                    | { query?: Methods41['get']['query'] | undefined; config?: T | undefined }
                    | undefined
                ) =>
                  fetch<Methods41['get']['resBody'], BasicHeaders, Methods41['get']['status']>(
                    prefix,
                    `${prefix3}${PATH7}`,
                    GET,
                    option
                  )
                    .json()
                    .then(r => r.body),
                /**
                 * @returns OK
                 */
                post: (option: { body: Methods41['post']['reqBody']; config?: T | undefined }) =>
                  fetch<Methods41['post']['resBody'], BasicHeaders, Methods41['post']['status']>(
                    prefix,
                    `${prefix3}${PATH7}`,
                    POST,
                    option,
                    'URLSearchParams'
                  ).json(),
                /**
                 * @returns OK
                 */
                $post: (option: { body: Methods41['post']['reqBody']; config?: T | undefined }) =>
                  fetch<Methods41['post']['resBody'], BasicHeaders, Methods41['post']['status']>(
                    prefix,
                    `${prefix3}${PATH7}`,
                    POST,
                    option,
                    'URLSearchParams'
                  )
                    .json()
                    .then(r => r.body),
                $path: (
                  option?:
                    | { method?: 'get' | undefined; query: Methods41['get']['query'] }
                    | undefined
                ) =>
                  `${prefix}${prefix3}${PATH7}${
                    option && option.query ? `?${dataToURLString(option.query)}` : ''
                  }`,
              },
              /**
               * @returns OK
               */
              get: (
                option?:
                  | { query?: Methods40['get']['query'] | undefined; config?: T | undefined }
                  | undefined
              ) =>
                fetch<Methods40['get']['resBody'], BasicHeaders, Methods40['get']['status']>(
                  prefix,
                  prefix3,
                  GET,
                  option
                ).json(),
              /**
               * @returns OK
               */
              $get: (
                option?:
                  | { query?: Methods40['get']['query'] | undefined; config?: T | undefined }
                  | undefined
              ) =>
                fetch<Methods40['get']['resBody'], BasicHeaders, Methods40['get']['status']>(
                  prefix,
                  prefix3,
                  GET,
                  option
                )
                  .json()
                  .then(r => r.body),
              /**
               * @returns OK
               */
              post: (option: { body: Methods40['post']['reqBody']; config?: T | undefined }) =>
                fetch<Methods40['post']['resBody'], BasicHeaders, Methods40['post']['status']>(
                  prefix,
                  prefix3,
                  POST,
                  option,
                  'URLSearchParams'
                ).json(),
              /**
               * @returns OK
               */
              $post: (option: { body: Methods40['post']['reqBody']; config?: T | undefined }) =>
                fetch<Methods40['post']['resBody'], BasicHeaders, Methods40['post']['status']>(
                  prefix,
                  prefix3,
                  POST,
                  option,
                  'URLSearchParams'
                )
                  .json()
                  .then(r => r.body),
              /**
               * @returns OK
               */
              put: (option: { body: Methods40['put']['reqBody']; config?: T | undefined }) =>
                fetch<Methods40['put']['resBody'], BasicHeaders, Methods40['put']['status']>(
                  prefix,
                  prefix3,
                  PUT,
                  option,
                  'URLSearchParams'
                ).json(),
              /**
               * @returns OK
               */
              $put: (option: { body: Methods40['put']['reqBody']; config?: T | undefined }) =>
                fetch<Methods40['put']['resBody'], BasicHeaders, Methods40['put']['status']>(
                  prefix,
                  prefix3,
                  PUT,
                  option,
                  'URLSearchParams'
                )
                  .json()
                  .then(r => r.body),
              /**
               * @returns OK
               */
              patch: (option: { body: Methods40['patch']['reqBody']; config?: T | undefined }) =>
                fetch<Methods40['patch']['resBody'], BasicHeaders, Methods40['patch']['status']>(
                  prefix,
                  prefix3,
                  PATCH,
                  option,
                  'URLSearchParams'
                ).json(),
              /**
               * @returns OK
               */
              $patch: (option: { body: Methods40['patch']['reqBody']; config?: T | undefined }) =>
                fetch<Methods40['patch']['resBody'], BasicHeaders, Methods40['patch']['status']>(
                  prefix,
                  prefix3,
                  PATCH,
                  option,
                  'URLSearchParams'
                )
                  .json()
                  .then(r => r.body),
              /**
               * @returns OK
               */
              delete: (option: { body: Methods40['delete']['reqBody']; config?: T | undefined }) =>
                fetch<Methods40['delete']['resBody'], BasicHeaders, Methods40['delete']['status']>(
                  prefix,
                  prefix3,
                  DELETE,
                  option,
                  'URLSearchParams'
                ).json(),
              /**
               * @returns OK
               */
              $delete: (option: { body: Methods40['delete']['reqBody']; config?: T | undefined }) =>
                fetch<Methods40['delete']['resBody'], BasicHeaders, Methods40['delete']['status']>(
                  prefix,
                  prefix3,
                  DELETE,
                  option,
                  'URLSearchParams'
                )
                  .json()
                  .then(r => r.body),
              $path: (
                option?:
                  | { method?: 'get' | undefined; query: Methods40['get']['query'] }
                  | undefined
              ) =>
                `${prefix}${prefix3}${
                  option && option.query ? `?${dataToURLString(option.query)}` : ''
                }`,
            }
          },
          _parent: (val3: string) => {
            const prefix3 = `${PATH21}/${val3}`

            return {
              autosaves: {
                _id: (val5: string) => {
                  const prefix5 = `${prefix3}${PATH7}/${val5}`

                  return {
                    /**
                     * @returns OK
                     */
                    get: (
                      option?:
                        | { query?: Methods42['get']['query'] | undefined; config?: T | undefined }
                        | undefined
                    ) =>
                      fetch<Methods42['get']['resBody'], BasicHeaders, Methods42['get']['status']>(
                        prefix,
                        prefix5,
                        GET,
                        option
                      ).json(),
                    /**
                     * @returns OK
                     */
                    $get: (
                      option?:
                        | { query?: Methods42['get']['query'] | undefined; config?: T | undefined }
                        | undefined
                    ) =>
                      fetch<Methods42['get']['resBody'], BasicHeaders, Methods42['get']['status']>(
                        prefix,
                        prefix5,
                        GET,
                        option
                      )
                        .json()
                        .then(r => r.body),
                    $path: (
                      option?:
                        | { method?: 'get' | undefined; query: Methods42['get']['query'] }
                        | undefined
                    ) =>
                      `${prefix}${prefix5}${
                        option && option.query ? `?${dataToURLString(option.query)}` : ''
                      }`,
                  }
                },
              },
              revisions: {
                _id: (val5: string) => {
                  const prefix5 = `${prefix3}${PATH8}/${val5}`

                  return {
                    /**
                     * @returns OK
                     */
                    get: (
                      option?:
                        | { query?: Methods44['get']['query'] | undefined; config?: T | undefined }
                        | undefined
                    ) =>
                      fetch<Methods44['get']['resBody'], BasicHeaders, Methods44['get']['status']>(
                        prefix,
                        prefix5,
                        GET,
                        option
                      ).json(),
                    /**
                     * @returns OK
                     */
                    $get: (
                      option?:
                        | { query?: Methods44['get']['query'] | undefined; config?: T | undefined }
                        | undefined
                    ) =>
                      fetch<Methods44['get']['resBody'], BasicHeaders, Methods44['get']['status']>(
                        prefix,
                        prefix5,
                        GET,
                        option
                      )
                        .json()
                        .then(r => r.body),
                    /**
                     * @returns OK
                     */
                    delete: (option: {
                      body: Methods44['delete']['reqBody']
                      config?: T | undefined
                    }) =>
                      fetch<
                        Methods44['delete']['resBody'],
                        BasicHeaders,
                        Methods44['delete']['status']
                      >(prefix, prefix5, DELETE, option, 'URLSearchParams').json(),
                    /**
                     * @returns OK
                     */
                    $delete: (option: {
                      body: Methods44['delete']['reqBody']
                      config?: T | undefined
                    }) =>
                      fetch<
                        Methods44['delete']['resBody'],
                        BasicHeaders,
                        Methods44['delete']['status']
                      >(prefix, prefix5, DELETE, option, 'URLSearchParams')
                        .json()
                        .then(r => r.body),
                    $path: (
                      option?:
                        | { method?: 'get' | undefined; query: Methods44['get']['query'] }
                        | undefined
                    ) =>
                      `${prefix}${prefix5}${
                        option && option.query ? `?${dataToURLString(option.query)}` : ''
                      }`,
                  }
                },
                /**
                 * @returns OK
                 */
                get: (
                  option?:
                    | { query?: Methods43['get']['query'] | undefined; config?: T | undefined }
                    | undefined
                ) =>
                  fetch<Methods43['get']['resBody'], BasicHeaders, Methods43['get']['status']>(
                    prefix,
                    `${prefix3}${PATH8}`,
                    GET,
                    option
                  ).json(),
                /**
                 * @returns OK
                 */
                $get: (
                  option?:
                    | { query?: Methods43['get']['query'] | undefined; config?: T | undefined }
                    | undefined
                ) =>
                  fetch<Methods43['get']['resBody'], BasicHeaders, Methods43['get']['status']>(
                    prefix,
                    `${prefix3}${PATH8}`,
                    GET,
                    option
                  )
                    .json()
                    .then(r => r.body),
                $path: (
                  option?:
                    | { method?: 'get' | undefined; query: Methods43['get']['query'] }
                    | undefined
                ) =>
                  `${prefix}${prefix3}${PATH8}${
                    option && option.query ? `?${dataToURLString(option.query)}` : ''
                  }`,
              },
            }
          },
          /**
           * @returns OK
           */
          get: (
            option?:
              | { query?: Methods39['get']['query'] | undefined; config?: T | undefined }
              | undefined
          ) =>
            fetch<Methods39['get']['resBody'], BasicHeaders, Methods39['get']['status']>(
              prefix,
              PATH21,
              GET,
              option
            ).json(),
          /**
           * @returns OK
           */
          $get: (
            option?:
              | { query?: Methods39['get']['query'] | undefined; config?: T | undefined }
              | undefined
          ) =>
            fetch<Methods39['get']['resBody'], BasicHeaders, Methods39['get']['status']>(
              prefix,
              PATH21,
              GET,
              option
            )
              .json()
              .then(r => r.body),
          /**
           * @returns OK
           */
          post: (option: { body: Methods39['post']['reqBody']; config?: T | undefined }) =>
            fetch<Methods39['post']['resBody'], BasicHeaders, Methods39['post']['status']>(
              prefix,
              PATH21,
              POST,
              option,
              'URLSearchParams'
            ).json(),
          /**
           * @returns OK
           */
          $post: (option: { body: Methods39['post']['reqBody']; config?: T | undefined }) =>
            fetch<Methods39['post']['resBody'], BasicHeaders, Methods39['post']['status']>(
              prefix,
              PATH21,
              POST,
              option,
              'URLSearchParams'
            )
              .json()
              .then(r => r.body),
          $path: (
            option?: { method?: 'get' | undefined; query: Methods39['get']['query'] } | undefined
          ) =>
            `${prefix}${PATH21}${
              option && option.query ? `?${dataToURLString(option.query)}` : ''
            }`,
        },
        pattern_directory: {
          patterns: {
            /**
             * @returns OK
             */
            get: (
              option?:
                | { query?: Methods45['get']['query'] | undefined; config?: T | undefined }
                | undefined
            ) =>
              fetch<Methods45['get']['resBody'], BasicHeaders, Methods45['get']['status']>(
                prefix,
                PATH22,
                GET,
                option
              ).json(),
            /**
             * @returns OK
             */
            $get: (
              option?:
                | { query?: Methods45['get']['query'] | undefined; config?: T | undefined }
                | undefined
            ) =>
              fetch<Methods45['get']['resBody'], BasicHeaders, Methods45['get']['status']>(
                prefix,
                PATH22,
                GET,
                option
              )
                .json()
                .then(r => r.body),
            $path: (
              option?: { method?: 'get' | undefined; query: Methods45['get']['query'] } | undefined
            ) =>
              `${prefix}${PATH22}${
                option && option.query ? `?${dataToURLString(option.query)}` : ''
              }`,
          },
        },
        plugins: {
          _plugin: (val3: string) => {
            const prefix3 = `${PATH23}/${val3}`

            return {
              /**
               * @returns OK
               */
              get: (
                option?:
                  | { query?: Methods47['get']['query'] | undefined; config?: T | undefined }
                  | undefined
              ) =>
                fetch<Methods47['get']['resBody'], BasicHeaders, Methods47['get']['status']>(
                  prefix,
                  prefix3,
                  GET,
                  option
                ).json(),
              /**
               * @returns OK
               */
              $get: (
                option?:
                  | { query?: Methods47['get']['query'] | undefined; config?: T | undefined }
                  | undefined
              ) =>
                fetch<Methods47['get']['resBody'], BasicHeaders, Methods47['get']['status']>(
                  prefix,
                  prefix3,
                  GET,
                  option
                )
                  .json()
                  .then(r => r.body),
              /**
               * @returns OK
               */
              post: (option: { body: Methods47['post']['reqBody']; config?: T | undefined }) =>
                fetch<Methods47['post']['resBody'], BasicHeaders, Methods47['post']['status']>(
                  prefix,
                  prefix3,
                  POST,
                  option,
                  'URLSearchParams'
                ).json(),
              /**
               * @returns OK
               */
              $post: (option: { body: Methods47['post']['reqBody']; config?: T | undefined }) =>
                fetch<Methods47['post']['resBody'], BasicHeaders, Methods47['post']['status']>(
                  prefix,
                  prefix3,
                  POST,
                  option,
                  'URLSearchParams'
                )
                  .json()
                  .then(r => r.body),
              /**
               * @returns OK
               */
              put: (option: { body: Methods47['put']['reqBody']; config?: T | undefined }) =>
                fetch<Methods47['put']['resBody'], BasicHeaders, Methods47['put']['status']>(
                  prefix,
                  prefix3,
                  PUT,
                  option,
                  'URLSearchParams'
                ).json(),
              /**
               * @returns OK
               */
              $put: (option: { body: Methods47['put']['reqBody']; config?: T | undefined }) =>
                fetch<Methods47['put']['resBody'], BasicHeaders, Methods47['put']['status']>(
                  prefix,
                  prefix3,
                  PUT,
                  option,
                  'URLSearchParams'
                )
                  .json()
                  .then(r => r.body),
              /**
               * @returns OK
               */
              patch: (option: { body: Methods47['patch']['reqBody']; config?: T | undefined }) =>
                fetch<Methods47['patch']['resBody'], BasicHeaders, Methods47['patch']['status']>(
                  prefix,
                  prefix3,
                  PATCH,
                  option,
                  'URLSearchParams'
                ).json(),
              /**
               * @returns OK
               */
              $patch: (option: { body: Methods47['patch']['reqBody']; config?: T | undefined }) =>
                fetch<Methods47['patch']['resBody'], BasicHeaders, Methods47['patch']['status']>(
                  prefix,
                  prefix3,
                  PATCH,
                  option,
                  'URLSearchParams'
                )
                  .json()
                  .then(r => r.body),
              /**
               * @returns OK
               */
              delete: (option: { body: Methods47['delete']['reqBody']; config?: T | undefined }) =>
                fetch<Methods47['delete']['resBody'], BasicHeaders, Methods47['delete']['status']>(
                  prefix,
                  prefix3,
                  DELETE,
                  option,
                  'URLSearchParams'
                ).json(),
              /**
               * @returns OK
               */
              $delete: (option: { body: Methods47['delete']['reqBody']; config?: T | undefined }) =>
                fetch<Methods47['delete']['resBody'], BasicHeaders, Methods47['delete']['status']>(
                  prefix,
                  prefix3,
                  DELETE,
                  option,
                  'URLSearchParams'
                )
                  .json()
                  .then(r => r.body),
              $path: (
                option?:
                  | { method?: 'get' | undefined; query: Methods47['get']['query'] }
                  | undefined
              ) =>
                `${prefix}${prefix3}${
                  option && option.query ? `?${dataToURLString(option.query)}` : ''
                }`,
            }
          },
          /**
           * @returns OK
           */
          get: (
            option?:
              | { query?: Methods46['get']['query'] | undefined; config?: T | undefined }
              | undefined
          ) =>
            fetch<Methods46['get']['resBody'], BasicHeaders, Methods46['get']['status']>(
              prefix,
              PATH23,
              GET,
              option
            ).json(),
          /**
           * @returns OK
           */
          $get: (
            option?:
              | { query?: Methods46['get']['query'] | undefined; config?: T | undefined }
              | undefined
          ) =>
            fetch<Methods46['get']['resBody'], BasicHeaders, Methods46['get']['status']>(
              prefix,
              PATH23,
              GET,
              option
            )
              .json()
              .then(r => r.body),
          /**
           * @returns OK
           */
          post: (option: { body: Methods46['post']['reqBody']; config?: T | undefined }) =>
            fetch<Methods46['post']['resBody'], BasicHeaders, Methods46['post']['status']>(
              prefix,
              PATH23,
              POST,
              option,
              'URLSearchParams'
            ).json(),
          /**
           * @returns OK
           */
          $post: (option: { body: Methods46['post']['reqBody']; config?: T | undefined }) =>
            fetch<Methods46['post']['resBody'], BasicHeaders, Methods46['post']['status']>(
              prefix,
              PATH23,
              POST,
              option,
              'URLSearchParams'
            )
              .json()
              .then(r => r.body),
          $path: (
            option?: { method?: 'get' | undefined; query: Methods46['get']['query'] } | undefined
          ) =>
            `${prefix}${PATH23}${
              option && option.query ? `?${dataToURLString(option.query)}` : ''
            }`,
        },
        posts: {
          _id: (val3: string) => {
            const prefix3 = `${PATH24}/${val3}`

            return {
              autosaves: {
                /**
                 * @returns OK
                 */
                get: (
                  option?:
                    | { query?: Methods50['get']['query'] | undefined; config?: T | undefined }
                    | undefined
                ) =>
                  fetch<Methods50['get']['resBody'], BasicHeaders, Methods50['get']['status']>(
                    prefix,
                    `${prefix3}${PATH7}`,
                    GET,
                    option
                  ).json(),
                /**
                 * @returns OK
                 */
                $get: (
                  option?:
                    | { query?: Methods50['get']['query'] | undefined; config?: T | undefined }
                    | undefined
                ) =>
                  fetch<Methods50['get']['resBody'], BasicHeaders, Methods50['get']['status']>(
                    prefix,
                    `${prefix3}${PATH7}`,
                    GET,
                    option
                  )
                    .json()
                    .then(r => r.body),
                /**
                 * @returns OK
                 */
                post: (option: { body: Methods50['post']['reqBody']; config?: T | undefined }) =>
                  fetch<Methods50['post']['resBody'], BasicHeaders, Methods50['post']['status']>(
                    prefix,
                    `${prefix3}${PATH7}`,
                    POST,
                    option,
                    'URLSearchParams'
                  ).json(),
                /**
                 * @returns OK
                 */
                $post: (option: { body: Methods50['post']['reqBody']; config?: T | undefined }) =>
                  fetch<Methods50['post']['resBody'], BasicHeaders, Methods50['post']['status']>(
                    prefix,
                    `${prefix3}${PATH7}`,
                    POST,
                    option,
                    'URLSearchParams'
                  )
                    .json()
                    .then(r => r.body),
                $path: (
                  option?:
                    | { method?: 'get' | undefined; query: Methods50['get']['query'] }
                    | undefined
                ) =>
                  `${prefix}${prefix3}${PATH7}${
                    option && option.query ? `?${dataToURLString(option.query)}` : ''
                  }`,
              },
              /**
               * @returns OK
               */
              get: (
                option?:
                  | { query?: Methods49['get']['query'] | undefined; config?: T | undefined }
                  | undefined
              ) =>
                fetch<Methods49['get']['resBody'], BasicHeaders, Methods49['get']['status']>(
                  prefix,
                  prefix3,
                  GET,
                  option
                ).json(),
              /**
               * @returns OK
               */
              $get: (
                option?:
                  | { query?: Methods49['get']['query'] | undefined; config?: T | undefined }
                  | undefined
              ) =>
                fetch<Methods49['get']['resBody'], BasicHeaders, Methods49['get']['status']>(
                  prefix,
                  prefix3,
                  GET,
                  option
                )
                  .json()
                  .then(r => r.body),
              /**
               * @returns OK
               */
              post: (option: { body: Methods49['post']['reqBody']; config?: T | undefined }) =>
                fetch<Methods49['post']['resBody'], BasicHeaders, Methods49['post']['status']>(
                  prefix,
                  prefix3,
                  POST,
                  option,
                  'URLSearchParams'
                ).json(),
              /**
               * @returns OK
               */
              $post: (option: { body: Methods49['post']['reqBody']; config?: T | undefined }) =>
                fetch<Methods49['post']['resBody'], BasicHeaders, Methods49['post']['status']>(
                  prefix,
                  prefix3,
                  POST,
                  option,
                  'URLSearchParams'
                )
                  .json()
                  .then(r => r.body),
              /**
               * @returns OK
               */
              put: (option: { body: Methods49['put']['reqBody']; config?: T | undefined }) =>
                fetch<Methods49['put']['resBody'], BasicHeaders, Methods49['put']['status']>(
                  prefix,
                  prefix3,
                  PUT,
                  option,
                  'URLSearchParams'
                ).json(),
              /**
               * @returns OK
               */
              $put: (option: { body: Methods49['put']['reqBody']; config?: T | undefined }) =>
                fetch<Methods49['put']['resBody'], BasicHeaders, Methods49['put']['status']>(
                  prefix,
                  prefix3,
                  PUT,
                  option,
                  'URLSearchParams'
                )
                  .json()
                  .then(r => r.body),
              /**
               * @returns OK
               */
              patch: (option: { body: Methods49['patch']['reqBody']; config?: T | undefined }) =>
                fetch<Methods49['patch']['resBody'], BasicHeaders, Methods49['patch']['status']>(
                  prefix,
                  prefix3,
                  PATCH,
                  option,
                  'URLSearchParams'
                ).json(),
              /**
               * @returns OK
               */
              $patch: (option: { body: Methods49['patch']['reqBody']; config?: T | undefined }) =>
                fetch<Methods49['patch']['resBody'], BasicHeaders, Methods49['patch']['status']>(
                  prefix,
                  prefix3,
                  PATCH,
                  option,
                  'URLSearchParams'
                )
                  .json()
                  .then(r => r.body),
              /**
               * @returns OK
               */
              delete: (option: { body: Methods49['delete']['reqBody']; config?: T | undefined }) =>
                fetch<Methods49['delete']['resBody'], BasicHeaders, Methods49['delete']['status']>(
                  prefix,
                  prefix3,
                  DELETE,
                  option,
                  'URLSearchParams'
                ).json(),
              /**
               * @returns OK
               */
              $delete: (option: { body: Methods49['delete']['reqBody']; config?: T | undefined }) =>
                fetch<Methods49['delete']['resBody'], BasicHeaders, Methods49['delete']['status']>(
                  prefix,
                  prefix3,
                  DELETE,
                  option,
                  'URLSearchParams'
                )
                  .json()
                  .then(r => r.body),
              $path: (
                option?:
                  | { method?: 'get' | undefined; query: Methods49['get']['query'] }
                  | undefined
              ) =>
                `${prefix}${prefix3}${
                  option && option.query ? `?${dataToURLString(option.query)}` : ''
                }`,
            }
          },
          _parent: (val3: string) => {
            const prefix3 = `${PATH24}/${val3}`

            return {
              autosaves: {
                _id: (val5: string) => {
                  const prefix5 = `${prefix3}${PATH7}/${val5}`

                  return {
                    /**
                     * @returns OK
                     */
                    get: (
                      option?:
                        | { query?: Methods51['get']['query'] | undefined; config?: T | undefined }
                        | undefined
                    ) =>
                      fetch<Methods51['get']['resBody'], BasicHeaders, Methods51['get']['status']>(
                        prefix,
                        prefix5,
                        GET,
                        option
                      ).json(),
                    /**
                     * @returns OK
                     */
                    $get: (
                      option?:
                        | { query?: Methods51['get']['query'] | undefined; config?: T | undefined }
                        | undefined
                    ) =>
                      fetch<Methods51['get']['resBody'], BasicHeaders, Methods51['get']['status']>(
                        prefix,
                        prefix5,
                        GET,
                        option
                      )
                        .json()
                        .then(r => r.body),
                    $path: (
                      option?:
                        | { method?: 'get' | undefined; query: Methods51['get']['query'] }
                        | undefined
                    ) =>
                      `${prefix}${prefix5}${
                        option && option.query ? `?${dataToURLString(option.query)}` : ''
                      }`,
                  }
                },
              },
              revisions: {
                _id: (val5: string) => {
                  const prefix5 = `${prefix3}${PATH8}/${val5}`

                  return {
                    /**
                     * @returns OK
                     */
                    get: (
                      option?:
                        | { query?: Methods53['get']['query'] | undefined; config?: T | undefined }
                        | undefined
                    ) =>
                      fetch<Methods53['get']['resBody'], BasicHeaders, Methods53['get']['status']>(
                        prefix,
                        prefix5,
                        GET,
                        option
                      ).json(),
                    /**
                     * @returns OK
                     */
                    $get: (
                      option?:
                        | { query?: Methods53['get']['query'] | undefined; config?: T | undefined }
                        | undefined
                    ) =>
                      fetch<Methods53['get']['resBody'], BasicHeaders, Methods53['get']['status']>(
                        prefix,
                        prefix5,
                        GET,
                        option
                      )
                        .json()
                        .then(r => r.body),
                    /**
                     * @returns OK
                     */
                    delete: (option: {
                      body: Methods53['delete']['reqBody']
                      config?: T | undefined
                    }) =>
                      fetch<
                        Methods53['delete']['resBody'],
                        BasicHeaders,
                        Methods53['delete']['status']
                      >(prefix, prefix5, DELETE, option, 'URLSearchParams').json(),
                    /**
                     * @returns OK
                     */
                    $delete: (option: {
                      body: Methods53['delete']['reqBody']
                      config?: T | undefined
                    }) =>
                      fetch<
                        Methods53['delete']['resBody'],
                        BasicHeaders,
                        Methods53['delete']['status']
                      >(prefix, prefix5, DELETE, option, 'URLSearchParams')
                        .json()
                        .then(r => r.body),
                    $path: (
                      option?:
                        | { method?: 'get' | undefined; query: Methods53['get']['query'] }
                        | undefined
                    ) =>
                      `${prefix}${prefix5}${
                        option && option.query ? `?${dataToURLString(option.query)}` : ''
                      }`,
                  }
                },
                /**
                 * @returns OK
                 */
                get: (
                  option?:
                    | { query?: Methods52['get']['query'] | undefined; config?: T | undefined }
                    | undefined
                ) =>
                  fetch<Methods52['get']['resBody'], BasicHeaders, Methods52['get']['status']>(
                    prefix,
                    `${prefix3}${PATH8}`,
                    GET,
                    option
                  ).json(),
                /**
                 * @returns OK
                 */
                $get: (
                  option?:
                    | { query?: Methods52['get']['query'] | undefined; config?: T | undefined }
                    | undefined
                ) =>
                  fetch<Methods52['get']['resBody'], BasicHeaders, Methods52['get']['status']>(
                    prefix,
                    `${prefix3}${PATH8}`,
                    GET,
                    option
                  )
                    .json()
                    .then(r => r.body),
                $path: (
                  option?:
                    | { method?: 'get' | undefined; query: Methods52['get']['query'] }
                    | undefined
                ) =>
                  `${prefix}${prefix3}${PATH8}${
                    option && option.query ? `?${dataToURLString(option.query)}` : ''
                  }`,
              },
            }
          },
          /**
           * @returns OK
           */
          get: (
            option?:
              | { query?: Methods48['get']['query'] | undefined; config?: T | undefined }
              | undefined
          ) =>
            fetch<Methods48['get']['resBody'], BasicHeaders, Methods48['get']['status']>(
              prefix,
              PATH24,
              GET,
              option
            ).json(),
          /**
           * @returns OK
           */
          $get: (
            option?:
              | { query?: Methods48['get']['query'] | undefined; config?: T | undefined }
              | undefined
          ) =>
            fetch<Methods48['get']['resBody'], BasicHeaders, Methods48['get']['status']>(
              prefix,
              PATH24,
              GET,
              option
            )
              .json()
              .then(r => r.body),
          /**
           * @returns OK
           */
          post: (option: { body: Methods48['post']['reqBody']; config?: T | undefined }) =>
            fetch<Methods48['post']['resBody'], BasicHeaders, Methods48['post']['status']>(
              prefix,
              PATH24,
              POST,
              option,
              'URLSearchParams'
            ).json(),
          /**
           * @returns OK
           */
          $post: (option: { body: Methods48['post']['reqBody']; config?: T | undefined }) =>
            fetch<Methods48['post']['resBody'], BasicHeaders, Methods48['post']['status']>(
              prefix,
              PATH24,
              POST,
              option,
              'URLSearchParams'
            )
              .json()
              .then(r => r.body),
          $path: (
            option?: { method?: 'get' | undefined; query: Methods48['get']['query'] } | undefined
          ) =>
            `${prefix}${PATH24}${
              option && option.query ? `?${dataToURLString(option.query)}` : ''
            }`,
        },
        search: {
          /**
           * @returns OK
           */
          get: (
            option?:
              | { query?: Methods54['get']['query'] | undefined; config?: T | undefined }
              | undefined
          ) =>
            fetch<Methods54['get']['resBody'], BasicHeaders, Methods54['get']['status']>(
              prefix,
              PATH25,
              GET,
              option
            ).json(),
          /**
           * @returns OK
           */
          $get: (
            option?:
              | { query?: Methods54['get']['query'] | undefined; config?: T | undefined }
              | undefined
          ) =>
            fetch<Methods54['get']['resBody'], BasicHeaders, Methods54['get']['status']>(
              prefix,
              PATH25,
              GET,
              option
            )
              .json()
              .then(r => r.body),
          $path: (
            option?: { method?: 'get' | undefined; query: Methods54['get']['query'] } | undefined
          ) =>
            `${prefix}${PATH25}${
              option && option.query ? `?${dataToURLString(option.query)}` : ''
            }`,
        },
        settings: {
          /**
           * @returns OK
           */
          get: (option?: { config?: T | undefined } | undefined) =>
            fetch<Methods55['get']['resBody'], BasicHeaders, Methods55['get']['status']>(
              prefix,
              PATH26,
              GET,
              option
            ).json(),
          /**
           * @returns OK
           */
          $get: (option?: { config?: T | undefined } | undefined) =>
            fetch<Methods55['get']['resBody'], BasicHeaders, Methods55['get']['status']>(
              prefix,
              PATH26,
              GET,
              option
            )
              .json()
              .then(r => r.body),
          /**
           * @returns OK
           */
          post: (option: { body: Methods55['post']['reqBody']; config?: T | undefined }) =>
            fetch<Methods55['post']['resBody'], BasicHeaders, Methods55['post']['status']>(
              prefix,
              PATH26,
              POST,
              option,
              'URLSearchParams'
            ).json(),
          /**
           * @returns OK
           */
          $post: (option: { body: Methods55['post']['reqBody']; config?: T | undefined }) =>
            fetch<Methods55['post']['resBody'], BasicHeaders, Methods55['post']['status']>(
              prefix,
              PATH26,
              POST,
              option,
              'URLSearchParams'
            )
              .json()
              .then(r => r.body),
          $path: () => `${prefix}${PATH26}`,
        },
        sidebars: {
          _id: (val3: string) => {
            const prefix3 = `${PATH27}/${val3}`

            return {
              /**
               * @returns OK
               */
              get: (
                option?:
                  | { query?: Methods57['get']['query'] | undefined; config?: T | undefined }
                  | undefined
              ) =>
                fetch<Methods57['get']['resBody'], BasicHeaders, Methods57['get']['status']>(
                  prefix,
                  prefix3,
                  GET,
                  option
                ).json(),
              /**
               * @returns OK
               */
              $get: (
                option?:
                  | { query?: Methods57['get']['query'] | undefined; config?: T | undefined }
                  | undefined
              ) =>
                fetch<Methods57['get']['resBody'], BasicHeaders, Methods57['get']['status']>(
                  prefix,
                  prefix3,
                  GET,
                  option
                )
                  .json()
                  .then(r => r.body),
              /**
               * @returns OK
               */
              post: (option: { body: Methods57['post']['reqBody']; config?: T | undefined }) =>
                fetch<Methods57['post']['resBody'], BasicHeaders, Methods57['post']['status']>(
                  prefix,
                  prefix3,
                  POST,
                  option,
                  'URLSearchParams'
                ).json(),
              /**
               * @returns OK
               */
              $post: (option: { body: Methods57['post']['reqBody']; config?: T | undefined }) =>
                fetch<Methods57['post']['resBody'], BasicHeaders, Methods57['post']['status']>(
                  prefix,
                  prefix3,
                  POST,
                  option,
                  'URLSearchParams'
                )
                  .json()
                  .then(r => r.body),
              /**
               * @returns OK
               */
              put: (option: { body: Methods57['put']['reqBody']; config?: T | undefined }) =>
                fetch<Methods57['put']['resBody'], BasicHeaders, Methods57['put']['status']>(
                  prefix,
                  prefix3,
                  PUT,
                  option,
                  'URLSearchParams'
                ).json(),
              /**
               * @returns OK
               */
              $put: (option: { body: Methods57['put']['reqBody']; config?: T | undefined }) =>
                fetch<Methods57['put']['resBody'], BasicHeaders, Methods57['put']['status']>(
                  prefix,
                  prefix3,
                  PUT,
                  option,
                  'URLSearchParams'
                )
                  .json()
                  .then(r => r.body),
              /**
               * @returns OK
               */
              patch: (option: { body: Methods57['patch']['reqBody']; config?: T | undefined }) =>
                fetch<Methods57['patch']['resBody'], BasicHeaders, Methods57['patch']['status']>(
                  prefix,
                  prefix3,
                  PATCH,
                  option,
                  'URLSearchParams'
                ).json(),
              /**
               * @returns OK
               */
              $patch: (option: { body: Methods57['patch']['reqBody']; config?: T | undefined }) =>
                fetch<Methods57['patch']['resBody'], BasicHeaders, Methods57['patch']['status']>(
                  prefix,
                  prefix3,
                  PATCH,
                  option,
                  'URLSearchParams'
                )
                  .json()
                  .then(r => r.body),
              $path: (
                option?:
                  | { method?: 'get' | undefined; query: Methods57['get']['query'] }
                  | undefined
              ) =>
                `${prefix}${prefix3}${
                  option && option.query ? `?${dataToURLString(option.query)}` : ''
                }`,
            }
          },
          /**
           * @returns OK
           */
          get: (
            option?:
              | { query?: Methods56['get']['query'] | undefined; config?: T | undefined }
              | undefined
          ) =>
            fetch<Methods56['get']['resBody'], BasicHeaders, Methods56['get']['status']>(
              prefix,
              PATH27,
              GET,
              option
            ).json(),
          /**
           * @returns OK
           */
          $get: (
            option?:
              | { query?: Methods56['get']['query'] | undefined; config?: T | undefined }
              | undefined
          ) =>
            fetch<Methods56['get']['resBody'], BasicHeaders, Methods56['get']['status']>(
              prefix,
              PATH27,
              GET,
              option
            )
              .json()
              .then(r => r.body),
          $path: (
            option?: { method?: 'get' | undefined; query: Methods56['get']['query'] } | undefined
          ) =>
            `${prefix}${PATH27}${
              option && option.query ? `?${dataToURLString(option.query)}` : ''
            }`,
        },
        statuses: {
          _status: (val3: string) => {
            const prefix3 = `${PATH28}/${val3}`

            return {
              /**
               * @returns OK
               */
              get: (
                option?:
                  | { query?: Methods59['get']['query'] | undefined; config?: T | undefined }
                  | undefined
              ) =>
                fetch<Methods59['get']['resBody'], BasicHeaders, Methods59['get']['status']>(
                  prefix,
                  prefix3,
                  GET,
                  option
                ).json(),
              /**
               * @returns OK
               */
              $get: (
                option?:
                  | { query?: Methods59['get']['query'] | undefined; config?: T | undefined }
                  | undefined
              ) =>
                fetch<Methods59['get']['resBody'], BasicHeaders, Methods59['get']['status']>(
                  prefix,
                  prefix3,
                  GET,
                  option
                )
                  .json()
                  .then(r => r.body),
              $path: (
                option?:
                  | { method?: 'get' | undefined; query: Methods59['get']['query'] }
                  | undefined
              ) =>
                `${prefix}${prefix3}${
                  option && option.query ? `?${dataToURLString(option.query)}` : ''
                }`,
            }
          },
          /**
           * @returns OK
           */
          get: (
            option?:
              | { query?: Methods58['get']['query'] | undefined; config?: T | undefined }
              | undefined
          ) =>
            fetch<Methods58['get']['resBody'], BasicHeaders, Methods58['get']['status']>(
              prefix,
              PATH28,
              GET,
              option
            ).json(),
          /**
           * @returns OK
           */
          $get: (
            option?:
              | { query?: Methods58['get']['query'] | undefined; config?: T | undefined }
              | undefined
          ) =>
            fetch<Methods58['get']['resBody'], BasicHeaders, Methods58['get']['status']>(
              prefix,
              PATH28,
              GET,
              option
            )
              .json()
              .then(r => r.body),
          $path: (
            option?: { method?: 'get' | undefined; query: Methods58['get']['query'] } | undefined
          ) =>
            `${prefix}${PATH28}${
              option && option.query ? `?${dataToURLString(option.query)}` : ''
            }`,
        },
        tags: {
          _id: (val3: string) => {
            const prefix3 = `${PATH29}/${val3}`

            return {
              /**
               * @returns OK
               */
              get: (
                option?:
                  | { query?: Methods61['get']['query'] | undefined; config?: T | undefined }
                  | undefined
              ) =>
                fetch<Methods61['get']['resBody'], BasicHeaders, Methods61['get']['status']>(
                  prefix,
                  prefix3,
                  GET,
                  option
                ).json(),
              /**
               * @returns OK
               */
              $get: (
                option?:
                  | { query?: Methods61['get']['query'] | undefined; config?: T | undefined }
                  | undefined
              ) =>
                fetch<Methods61['get']['resBody'], BasicHeaders, Methods61['get']['status']>(
                  prefix,
                  prefix3,
                  GET,
                  option
                )
                  .json()
                  .then(r => r.body),
              /**
               * @returns OK
               */
              post: (option: { body: Methods61['post']['reqBody']; config?: T | undefined }) =>
                fetch<Methods61['post']['resBody'], BasicHeaders, Methods61['post']['status']>(
                  prefix,
                  prefix3,
                  POST,
                  option,
                  'URLSearchParams'
                ).json(),
              /**
               * @returns OK
               */
              $post: (option: { body: Methods61['post']['reqBody']; config?: T | undefined }) =>
                fetch<Methods61['post']['resBody'], BasicHeaders, Methods61['post']['status']>(
                  prefix,
                  prefix3,
                  POST,
                  option,
                  'URLSearchParams'
                )
                  .json()
                  .then(r => r.body),
              /**
               * @returns OK
               */
              put: (option: { body: Methods61['put']['reqBody']; config?: T | undefined }) =>
                fetch<Methods61['put']['resBody'], BasicHeaders, Methods61['put']['status']>(
                  prefix,
                  prefix3,
                  PUT,
                  option,
                  'URLSearchParams'
                ).json(),
              /**
               * @returns OK
               */
              $put: (option: { body: Methods61['put']['reqBody']; config?: T | undefined }) =>
                fetch<Methods61['put']['resBody'], BasicHeaders, Methods61['put']['status']>(
                  prefix,
                  prefix3,
                  PUT,
                  option,
                  'URLSearchParams'
                )
                  .json()
                  .then(r => r.body),
              /**
               * @returns OK
               */
              patch: (option: { body: Methods61['patch']['reqBody']; config?: T | undefined }) =>
                fetch<Methods61['patch']['resBody'], BasicHeaders, Methods61['patch']['status']>(
                  prefix,
                  prefix3,
                  PATCH,
                  option,
                  'URLSearchParams'
                ).json(),
              /**
               * @returns OK
               */
              $patch: (option: { body: Methods61['patch']['reqBody']; config?: T | undefined }) =>
                fetch<Methods61['patch']['resBody'], BasicHeaders, Methods61['patch']['status']>(
                  prefix,
                  prefix3,
                  PATCH,
                  option,
                  'URLSearchParams'
                )
                  .json()
                  .then(r => r.body),
              /**
               * @returns OK
               */
              delete: (option: { body: Methods61['delete']['reqBody']; config?: T | undefined }) =>
                fetch<Methods61['delete']['resBody'], BasicHeaders, Methods61['delete']['status']>(
                  prefix,
                  prefix3,
                  DELETE,
                  option,
                  'URLSearchParams'
                ).json(),
              /**
               * @returns OK
               */
              $delete: (option: { body: Methods61['delete']['reqBody']; config?: T | undefined }) =>
                fetch<Methods61['delete']['resBody'], BasicHeaders, Methods61['delete']['status']>(
                  prefix,
                  prefix3,
                  DELETE,
                  option,
                  'URLSearchParams'
                )
                  .json()
                  .then(r => r.body),
              $path: (
                option?:
                  | { method?: 'get' | undefined; query: Methods61['get']['query'] }
                  | undefined
              ) =>
                `${prefix}${prefix3}${
                  option && option.query ? `?${dataToURLString(option.query)}` : ''
                }`,
            }
          },
          /**
           * @returns OK
           */
          get: (
            option?:
              | { query?: Methods60['get']['query'] | undefined; config?: T | undefined }
              | undefined
          ) =>
            fetch<Methods60['get']['resBody'], BasicHeaders, Methods60['get']['status']>(
              prefix,
              PATH29,
              GET,
              option
            ).json(),
          /**
           * @returns OK
           */
          $get: (
            option?:
              | { query?: Methods60['get']['query'] | undefined; config?: T | undefined }
              | undefined
          ) =>
            fetch<Methods60['get']['resBody'], BasicHeaders, Methods60['get']['status']>(
              prefix,
              PATH29,
              GET,
              option
            )
              .json()
              .then(r => r.body),
          /**
           * @returns OK
           */
          post: (option: { body: Methods60['post']['reqBody']; config?: T | undefined }) =>
            fetch<Methods60['post']['resBody'], BasicHeaders, Methods60['post']['status']>(
              prefix,
              PATH29,
              POST,
              option,
              'URLSearchParams'
            ).json(),
          /**
           * @returns OK
           */
          $post: (option: { body: Methods60['post']['reqBody']; config?: T | undefined }) =>
            fetch<Methods60['post']['resBody'], BasicHeaders, Methods60['post']['status']>(
              prefix,
              PATH29,
              POST,
              option,
              'URLSearchParams'
            )
              .json()
              .then(r => r.body),
          $path: (
            option?: { method?: 'get' | undefined; query: Methods60['get']['query'] } | undefined
          ) =>
            `${prefix}${PATH29}${
              option && option.query ? `?${dataToURLString(option.query)}` : ''
            }`,
        },
        taxonomies: {
          _taxonomy: (val3: string) => {
            const prefix3 = `${PATH30}/${val3}`

            return {
              /**
               * @returns OK
               */
              get: (
                option?:
                  | { query?: Methods63['get']['query'] | undefined; config?: T | undefined }
                  | undefined
              ) =>
                fetch<Methods63['get']['resBody'], BasicHeaders, Methods63['get']['status']>(
                  prefix,
                  prefix3,
                  GET,
                  option
                ).json(),
              /**
               * @returns OK
               */
              $get: (
                option?:
                  | { query?: Methods63['get']['query'] | undefined; config?: T | undefined }
                  | undefined
              ) =>
                fetch<Methods63['get']['resBody'], BasicHeaders, Methods63['get']['status']>(
                  prefix,
                  prefix3,
                  GET,
                  option
                )
                  .json()
                  .then(r => r.body),
              $path: (
                option?:
                  | { method?: 'get' | undefined; query: Methods63['get']['query'] }
                  | undefined
              ) =>
                `${prefix}${prefix3}${
                  option && option.query ? `?${dataToURLString(option.query)}` : ''
                }`,
            }
          },
          /**
           * @returns OK
           */
          get: (
            option?:
              | { query?: Methods62['get']['query'] | undefined; config?: T | undefined }
              | undefined
          ) =>
            fetch<Methods62['get']['resBody'], BasicHeaders, Methods62['get']['status']>(
              prefix,
              PATH30,
              GET,
              option
            ).json(),
          /**
           * @returns OK
           */
          $get: (
            option?:
              | { query?: Methods62['get']['query'] | undefined; config?: T | undefined }
              | undefined
          ) =>
            fetch<Methods62['get']['resBody'], BasicHeaders, Methods62['get']['status']>(
              prefix,
              PATH30,
              GET,
              option
            )
              .json()
              .then(r => r.body),
          $path: (
            option?: { method?: 'get' | undefined; query: Methods62['get']['query'] } | undefined
          ) =>
            `${prefix}${PATH30}${
              option && option.query ? `?${dataToURLString(option.query)}` : ''
            }`,
        },
        template_parts: {
          _id: (val3: string) => {
            const prefix3 = `${PATH31}/${val3}`

            return {
              autosaves: {
                /**
                 * @returns OK
                 */
                get: (
                  option?:
                    | { query?: Methods66['get']['query'] | undefined; config?: T | undefined }
                    | undefined
                ) =>
                  fetch<Methods66['get']['resBody'], BasicHeaders, Methods66['get']['status']>(
                    prefix,
                    `${prefix3}${PATH7}`,
                    GET,
                    option
                  ).json(),
                /**
                 * @returns OK
                 */
                $get: (
                  option?:
                    | { query?: Methods66['get']['query'] | undefined; config?: T | undefined }
                    | undefined
                ) =>
                  fetch<Methods66['get']['resBody'], BasicHeaders, Methods66['get']['status']>(
                    prefix,
                    `${prefix3}${PATH7}`,
                    GET,
                    option
                  )
                    .json()
                    .then(r => r.body),
                /**
                 * @returns OK
                 */
                post: (option: { body: Methods66['post']['reqBody']; config?: T | undefined }) =>
                  fetch<Methods66['post']['resBody'], BasicHeaders, Methods66['post']['status']>(
                    prefix,
                    `${prefix3}${PATH7}`,
                    POST,
                    option,
                    'URLSearchParams'
                  ).json(),
                /**
                 * @returns OK
                 */
                $post: (option: { body: Methods66['post']['reqBody']; config?: T | undefined }) =>
                  fetch<Methods66['post']['resBody'], BasicHeaders, Methods66['post']['status']>(
                    prefix,
                    `${prefix3}${PATH7}`,
                    POST,
                    option,
                    'URLSearchParams'
                  )
                    .json()
                    .then(r => r.body),
                $path: (
                  option?:
                    | { method?: 'get' | undefined; query: Methods66['get']['query'] }
                    | undefined
                ) =>
                  `${prefix}${prefix3}${PATH7}${
                    option && option.query ? `?${dataToURLString(option.query)}` : ''
                  }`,
              },
              /**
               * @returns OK
               */
              get: (
                option?:
                  | { query?: Methods65['get']['query'] | undefined; config?: T | undefined }
                  | undefined
              ) =>
                fetch<Methods65['get']['resBody'], BasicHeaders, Methods65['get']['status']>(
                  prefix,
                  prefix3,
                  GET,
                  option
                ).json(),
              /**
               * @returns OK
               */
              $get: (
                option?:
                  | { query?: Methods65['get']['query'] | undefined; config?: T | undefined }
                  | undefined
              ) =>
                fetch<Methods65['get']['resBody'], BasicHeaders, Methods65['get']['status']>(
                  prefix,
                  prefix3,
                  GET,
                  option
                )
                  .json()
                  .then(r => r.body),
              /**
               * @returns OK
               */
              post: (option: { body: Methods65['post']['reqBody']; config?: T | undefined }) =>
                fetch<Methods65['post']['resBody'], BasicHeaders, Methods65['post']['status']>(
                  prefix,
                  prefix3,
                  POST,
                  option,
                  'URLSearchParams'
                ).json(),
              /**
               * @returns OK
               */
              $post: (option: { body: Methods65['post']['reqBody']; config?: T | undefined }) =>
                fetch<Methods65['post']['resBody'], BasicHeaders, Methods65['post']['status']>(
                  prefix,
                  prefix3,
                  POST,
                  option,
                  'URLSearchParams'
                )
                  .json()
                  .then(r => r.body),
              /**
               * @returns OK
               */
              put: (option: { body: Methods65['put']['reqBody']; config?: T | undefined }) =>
                fetch<Methods65['put']['resBody'], BasicHeaders, Methods65['put']['status']>(
                  prefix,
                  prefix3,
                  PUT,
                  option,
                  'URLSearchParams'
                ).json(),
              /**
               * @returns OK
               */
              $put: (option: { body: Methods65['put']['reqBody']; config?: T | undefined }) =>
                fetch<Methods65['put']['resBody'], BasicHeaders, Methods65['put']['status']>(
                  prefix,
                  prefix3,
                  PUT,
                  option,
                  'URLSearchParams'
                )
                  .json()
                  .then(r => r.body),
              /**
               * @returns OK
               */
              patch: (option: { body: Methods65['patch']['reqBody']; config?: T | undefined }) =>
                fetch<Methods65['patch']['resBody'], BasicHeaders, Methods65['patch']['status']>(
                  prefix,
                  prefix3,
                  PATCH,
                  option,
                  'URLSearchParams'
                ).json(),
              /**
               * @returns OK
               */
              $patch: (option: { body: Methods65['patch']['reqBody']; config?: T | undefined }) =>
                fetch<Methods65['patch']['resBody'], BasicHeaders, Methods65['patch']['status']>(
                  prefix,
                  prefix3,
                  PATCH,
                  option,
                  'URLSearchParams'
                )
                  .json()
                  .then(r => r.body),
              /**
               * @returns OK
               */
              delete: (option: { body: Methods65['delete']['reqBody']; config?: T | undefined }) =>
                fetch<Methods65['delete']['resBody'], BasicHeaders, Methods65['delete']['status']>(
                  prefix,
                  prefix3,
                  DELETE,
                  option,
                  'URLSearchParams'
                ).json(),
              /**
               * @returns OK
               */
              $delete: (option: { body: Methods65['delete']['reqBody']; config?: T | undefined }) =>
                fetch<Methods65['delete']['resBody'], BasicHeaders, Methods65['delete']['status']>(
                  prefix,
                  prefix3,
                  DELETE,
                  option,
                  'URLSearchParams'
                )
                  .json()
                  .then(r => r.body),
              $path: (
                option?:
                  | { method?: 'get' | undefined; query: Methods65['get']['query'] }
                  | undefined
              ) =>
                `${prefix}${prefix3}${
                  option && option.query ? `?${dataToURLString(option.query)}` : ''
                }`,
            }
          },
          _parent: (val3: string) => {
            const prefix3 = `${PATH31}/${val3}`

            return {
              autosaves: {
                _id: (val5: string) => {
                  const prefix5 = `${prefix3}${PATH7}/${val5}`

                  return {
                    /**
                     * @returns OK
                     */
                    get: (
                      option?:
                        | { query?: Methods67['get']['query'] | undefined; config?: T | undefined }
                        | undefined
                    ) =>
                      fetch<Methods67['get']['resBody'], BasicHeaders, Methods67['get']['status']>(
                        prefix,
                        prefix5,
                        GET,
                        option
                      ).json(),
                    /**
                     * @returns OK
                     */
                    $get: (
                      option?:
                        | { query?: Methods67['get']['query'] | undefined; config?: T | undefined }
                        | undefined
                    ) =>
                      fetch<Methods67['get']['resBody'], BasicHeaders, Methods67['get']['status']>(
                        prefix,
                        prefix5,
                        GET,
                        option
                      )
                        .json()
                        .then(r => r.body),
                    $path: (
                      option?:
                        | { method?: 'get' | undefined; query: Methods67['get']['query'] }
                        | undefined
                    ) =>
                      `${prefix}${prefix5}${
                        option && option.query ? `?${dataToURLString(option.query)}` : ''
                      }`,
                  }
                },
              },
              revisions: {
                _id: (val5: string) => {
                  const prefix5 = `${prefix3}${PATH8}/${val5}`

                  return {
                    /**
                     * @returns OK
                     */
                    get: (
                      option?:
                        | { query?: Methods69['get']['query'] | undefined; config?: T | undefined }
                        | undefined
                    ) =>
                      fetch<Methods69['get']['resBody'], BasicHeaders, Methods69['get']['status']>(
                        prefix,
                        prefix5,
                        GET,
                        option
                      ).json(),
                    /**
                     * @returns OK
                     */
                    $get: (
                      option?:
                        | { query?: Methods69['get']['query'] | undefined; config?: T | undefined }
                        | undefined
                    ) =>
                      fetch<Methods69['get']['resBody'], BasicHeaders, Methods69['get']['status']>(
                        prefix,
                        prefix5,
                        GET,
                        option
                      )
                        .json()
                        .then(r => r.body),
                    /**
                     * @returns OK
                     */
                    delete: (option: {
                      body: Methods69['delete']['reqBody']
                      config?: T | undefined
                    }) =>
                      fetch<
                        Methods69['delete']['resBody'],
                        BasicHeaders,
                        Methods69['delete']['status']
                      >(prefix, prefix5, DELETE, option, 'URLSearchParams').json(),
                    /**
                     * @returns OK
                     */
                    $delete: (option: {
                      body: Methods69['delete']['reqBody']
                      config?: T | undefined
                    }) =>
                      fetch<
                        Methods69['delete']['resBody'],
                        BasicHeaders,
                        Methods69['delete']['status']
                      >(prefix, prefix5, DELETE, option, 'URLSearchParams')
                        .json()
                        .then(r => r.body),
                    $path: (
                      option?:
                        | { method?: 'get' | undefined; query: Methods69['get']['query'] }
                        | undefined
                    ) =>
                      `${prefix}${prefix5}${
                        option && option.query ? `?${dataToURLString(option.query)}` : ''
                      }`,
                  }
                },
                /**
                 * @returns OK
                 */
                get: (
                  option?:
                    | { query?: Methods68['get']['query'] | undefined; config?: T | undefined }
                    | undefined
                ) =>
                  fetch<Methods68['get']['resBody'], BasicHeaders, Methods68['get']['status']>(
                    prefix,
                    `${prefix3}${PATH8}`,
                    GET,
                    option
                  ).json(),
                /**
                 * @returns OK
                 */
                $get: (
                  option?:
                    | { query?: Methods68['get']['query'] | undefined; config?: T | undefined }
                    | undefined
                ) =>
                  fetch<Methods68['get']['resBody'], BasicHeaders, Methods68['get']['status']>(
                    prefix,
                    `${prefix3}${PATH8}`,
                    GET,
                    option
                  )
                    .json()
                    .then(r => r.body),
                $path: (
                  option?:
                    | { method?: 'get' | undefined; query: Methods68['get']['query'] }
                    | undefined
                ) =>
                  `${prefix}${prefix3}${PATH8}${
                    option && option.query ? `?${dataToURLString(option.query)}` : ''
                  }`,
              },
            }
          },
          /**
           * @returns OK
           */
          get: (
            option?:
              | { query?: Methods64['get']['query'] | undefined; config?: T | undefined }
              | undefined
          ) =>
            fetch<Methods64['get']['resBody'], BasicHeaders, Methods64['get']['status']>(
              prefix,
              PATH31,
              GET,
              option
            ).json(),
          /**
           * @returns OK
           */
          $get: (
            option?:
              | { query?: Methods64['get']['query'] | undefined; config?: T | undefined }
              | undefined
          ) =>
            fetch<Methods64['get']['resBody'], BasicHeaders, Methods64['get']['status']>(
              prefix,
              PATH31,
              GET,
              option
            )
              .json()
              .then(r => r.body),
          /**
           * @returns OK
           */
          post: (option: { body: Methods64['post']['reqBody']; config?: T | undefined }) =>
            fetch<Methods64['post']['resBody'], BasicHeaders, Methods64['post']['status']>(
              prefix,
              PATH31,
              POST,
              option,
              'URLSearchParams'
            ).json(),
          /**
           * @returns OK
           */
          $post: (option: { body: Methods64['post']['reqBody']; config?: T | undefined }) =>
            fetch<Methods64['post']['resBody'], BasicHeaders, Methods64['post']['status']>(
              prefix,
              PATH31,
              POST,
              option,
              'URLSearchParams'
            )
              .json()
              .then(r => r.body),
          $path: (
            option?: { method?: 'get' | undefined; query: Methods64['get']['query'] } | undefined
          ) =>
            `${prefix}${PATH31}${
              option && option.query ? `?${dataToURLString(option.query)}` : ''
            }`,
        },
        templates: {
          _id: (val3: string) => {
            const prefix3 = `${PATH32}/${val3}`

            return {
              autosaves: {
                /**
                 * @returns OK
                 */
                get: (
                  option?:
                    | { query?: Methods72['get']['query'] | undefined; config?: T | undefined }
                    | undefined
                ) =>
                  fetch<Methods72['get']['resBody'], BasicHeaders, Methods72['get']['status']>(
                    prefix,
                    `${prefix3}${PATH7}`,
                    GET,
                    option
                  ).json(),
                /**
                 * @returns OK
                 */
                $get: (
                  option?:
                    | { query?: Methods72['get']['query'] | undefined; config?: T | undefined }
                    | undefined
                ) =>
                  fetch<Methods72['get']['resBody'], BasicHeaders, Methods72['get']['status']>(
                    prefix,
                    `${prefix3}${PATH7}`,
                    GET,
                    option
                  )
                    .json()
                    .then(r => r.body),
                /**
                 * @returns OK
                 */
                post: (option: { body: Methods72['post']['reqBody']; config?: T | undefined }) =>
                  fetch<Methods72['post']['resBody'], BasicHeaders, Methods72['post']['status']>(
                    prefix,
                    `${prefix3}${PATH7}`,
                    POST,
                    option,
                    'URLSearchParams'
                  ).json(),
                /**
                 * @returns OK
                 */
                $post: (option: { body: Methods72['post']['reqBody']; config?: T | undefined }) =>
                  fetch<Methods72['post']['resBody'], BasicHeaders, Methods72['post']['status']>(
                    prefix,
                    `${prefix3}${PATH7}`,
                    POST,
                    option,
                    'URLSearchParams'
                  )
                    .json()
                    .then(r => r.body),
                $path: (
                  option?:
                    | { method?: 'get' | undefined; query: Methods72['get']['query'] }
                    | undefined
                ) =>
                  `${prefix}${prefix3}${PATH7}${
                    option && option.query ? `?${dataToURLString(option.query)}` : ''
                  }`,
              },
              /**
               * @returns OK
               */
              get: (
                option?:
                  | { query?: Methods71['get']['query'] | undefined; config?: T | undefined }
                  | undefined
              ) =>
                fetch<Methods71['get']['resBody'], BasicHeaders, Methods71['get']['status']>(
                  prefix,
                  prefix3,
                  GET,
                  option
                ).json(),
              /**
               * @returns OK
               */
              $get: (
                option?:
                  | { query?: Methods71['get']['query'] | undefined; config?: T | undefined }
                  | undefined
              ) =>
                fetch<Methods71['get']['resBody'], BasicHeaders, Methods71['get']['status']>(
                  prefix,
                  prefix3,
                  GET,
                  option
                )
                  .json()
                  .then(r => r.body),
              /**
               * @returns OK
               */
              post: (option: { body: Methods71['post']['reqBody']; config?: T | undefined }) =>
                fetch<Methods71['post']['resBody'], BasicHeaders, Methods71['post']['status']>(
                  prefix,
                  prefix3,
                  POST,
                  option,
                  'URLSearchParams'
                ).json(),
              /**
               * @returns OK
               */
              $post: (option: { body: Methods71['post']['reqBody']; config?: T | undefined }) =>
                fetch<Methods71['post']['resBody'], BasicHeaders, Methods71['post']['status']>(
                  prefix,
                  prefix3,
                  POST,
                  option,
                  'URLSearchParams'
                )
                  .json()
                  .then(r => r.body),
              /**
               * @returns OK
               */
              put: (option: { body: Methods71['put']['reqBody']; config?: T | undefined }) =>
                fetch<Methods71['put']['resBody'], BasicHeaders, Methods71['put']['status']>(
                  prefix,
                  prefix3,
                  PUT,
                  option,
                  'URLSearchParams'
                ).json(),
              /**
               * @returns OK
               */
              $put: (option: { body: Methods71['put']['reqBody']; config?: T | undefined }) =>
                fetch<Methods71['put']['resBody'], BasicHeaders, Methods71['put']['status']>(
                  prefix,
                  prefix3,
                  PUT,
                  option,
                  'URLSearchParams'
                )
                  .json()
                  .then(r => r.body),
              /**
               * @returns OK
               */
              patch: (option: { body: Methods71['patch']['reqBody']; config?: T | undefined }) =>
                fetch<Methods71['patch']['resBody'], BasicHeaders, Methods71['patch']['status']>(
                  prefix,
                  prefix3,
                  PATCH,
                  option,
                  'URLSearchParams'
                ).json(),
              /**
               * @returns OK
               */
              $patch: (option: { body: Methods71['patch']['reqBody']; config?: T | undefined }) =>
                fetch<Methods71['patch']['resBody'], BasicHeaders, Methods71['patch']['status']>(
                  prefix,
                  prefix3,
                  PATCH,
                  option,
                  'URLSearchParams'
                )
                  .json()
                  .then(r => r.body),
              /**
               * @returns OK
               */
              delete: (option: { body: Methods71['delete']['reqBody']; config?: T | undefined }) =>
                fetch<Methods71['delete']['resBody'], BasicHeaders, Methods71['delete']['status']>(
                  prefix,
                  prefix3,
                  DELETE,
                  option,
                  'URLSearchParams'
                ).json(),
              /**
               * @returns OK
               */
              $delete: (option: { body: Methods71['delete']['reqBody']; config?: T | undefined }) =>
                fetch<Methods71['delete']['resBody'], BasicHeaders, Methods71['delete']['status']>(
                  prefix,
                  prefix3,
                  DELETE,
                  option,
                  'URLSearchParams'
                )
                  .json()
                  .then(r => r.body),
              $path: (
                option?:
                  | { method?: 'get' | undefined; query: Methods71['get']['query'] }
                  | undefined
              ) =>
                `${prefix}${prefix3}${
                  option && option.query ? `?${dataToURLString(option.query)}` : ''
                }`,
            }
          },
          _parent: (val3: string) => {
            const prefix3 = `${PATH32}/${val3}`

            return {
              autosaves: {
                _id: (val5: string) => {
                  const prefix5 = `${prefix3}${PATH7}/${val5}`

                  return {
                    /**
                     * @returns OK
                     */
                    get: (
                      option?:
                        | { query?: Methods73['get']['query'] | undefined; config?: T | undefined }
                        | undefined
                    ) =>
                      fetch<Methods73['get']['resBody'], BasicHeaders, Methods73['get']['status']>(
                        prefix,
                        prefix5,
                        GET,
                        option
                      ).json(),
                    /**
                     * @returns OK
                     */
                    $get: (
                      option?:
                        | { query?: Methods73['get']['query'] | undefined; config?: T | undefined }
                        | undefined
                    ) =>
                      fetch<Methods73['get']['resBody'], BasicHeaders, Methods73['get']['status']>(
                        prefix,
                        prefix5,
                        GET,
                        option
                      )
                        .json()
                        .then(r => r.body),
                    $path: (
                      option?:
                        | { method?: 'get' | undefined; query: Methods73['get']['query'] }
                        | undefined
                    ) =>
                      `${prefix}${prefix5}${
                        option && option.query ? `?${dataToURLString(option.query)}` : ''
                      }`,
                  }
                },
              },
              revisions: {
                _id: (val5: string) => {
                  const prefix5 = `${prefix3}${PATH8}/${val5}`

                  return {
                    /**
                     * @returns OK
                     */
                    get: (
                      option?:
                        | { query?: Methods75['get']['query'] | undefined; config?: T | undefined }
                        | undefined
                    ) =>
                      fetch<Methods75['get']['resBody'], BasicHeaders, Methods75['get']['status']>(
                        prefix,
                        prefix5,
                        GET,
                        option
                      ).json(),
                    /**
                     * @returns OK
                     */
                    $get: (
                      option?:
                        | { query?: Methods75['get']['query'] | undefined; config?: T | undefined }
                        | undefined
                    ) =>
                      fetch<Methods75['get']['resBody'], BasicHeaders, Methods75['get']['status']>(
                        prefix,
                        prefix5,
                        GET,
                        option
                      )
                        .json()
                        .then(r => r.body),
                    /**
                     * @returns OK
                     */
                    delete: (option: {
                      body: Methods75['delete']['reqBody']
                      config?: T | undefined
                    }) =>
                      fetch<
                        Methods75['delete']['resBody'],
                        BasicHeaders,
                        Methods75['delete']['status']
                      >(prefix, prefix5, DELETE, option, 'URLSearchParams').json(),
                    /**
                     * @returns OK
                     */
                    $delete: (option: {
                      body: Methods75['delete']['reqBody']
                      config?: T | undefined
                    }) =>
                      fetch<
                        Methods75['delete']['resBody'],
                        BasicHeaders,
                        Methods75['delete']['status']
                      >(prefix, prefix5, DELETE, option, 'URLSearchParams')
                        .json()
                        .then(r => r.body),
                    $path: (
                      option?:
                        | { method?: 'get' | undefined; query: Methods75['get']['query'] }
                        | undefined
                    ) =>
                      `${prefix}${prefix5}${
                        option && option.query ? `?${dataToURLString(option.query)}` : ''
                      }`,
                  }
                },
                /**
                 * @returns OK
                 */
                get: (
                  option?:
                    | { query?: Methods74['get']['query'] | undefined; config?: T | undefined }
                    | undefined
                ) =>
                  fetch<Methods74['get']['resBody'], BasicHeaders, Methods74['get']['status']>(
                    prefix,
                    `${prefix3}${PATH8}`,
                    GET,
                    option
                  ).json(),
                /**
                 * @returns OK
                 */
                $get: (
                  option?:
                    | { query?: Methods74['get']['query'] | undefined; config?: T | undefined }
                    | undefined
                ) =>
                  fetch<Methods74['get']['resBody'], BasicHeaders, Methods74['get']['status']>(
                    prefix,
                    `${prefix3}${PATH8}`,
                    GET,
                    option
                  )
                    .json()
                    .then(r => r.body),
                $path: (
                  option?:
                    | { method?: 'get' | undefined; query: Methods74['get']['query'] }
                    | undefined
                ) =>
                  `${prefix}${prefix3}${PATH8}${
                    option && option.query ? `?${dataToURLString(option.query)}` : ''
                  }`,
              },
            }
          },
          /**
           * @returns OK
           */
          get: (
            option?:
              | { query?: Methods70['get']['query'] | undefined; config?: T | undefined }
              | undefined
          ) =>
            fetch<Methods70['get']['resBody'], BasicHeaders, Methods70['get']['status']>(
              prefix,
              PATH32,
              GET,
              option
            ).json(),
          /**
           * @returns OK
           */
          $get: (
            option?:
              | { query?: Methods70['get']['query'] | undefined; config?: T | undefined }
              | undefined
          ) =>
            fetch<Methods70['get']['resBody'], BasicHeaders, Methods70['get']['status']>(
              prefix,
              PATH32,
              GET,
              option
            )
              .json()
              .then(r => r.body),
          /**
           * @returns OK
           */
          post: (option: { body: Methods70['post']['reqBody']; config?: T | undefined }) =>
            fetch<Methods70['post']['resBody'], BasicHeaders, Methods70['post']['status']>(
              prefix,
              PATH32,
              POST,
              option,
              'URLSearchParams'
            ).json(),
          /**
           * @returns OK
           */
          $post: (option: { body: Methods70['post']['reqBody']; config?: T | undefined }) =>
            fetch<Methods70['post']['resBody'], BasicHeaders, Methods70['post']['status']>(
              prefix,
              PATH32,
              POST,
              option,
              'URLSearchParams'
            )
              .json()
              .then(r => r.body),
          $path: (
            option?: { method?: 'get' | undefined; query: Methods70['get']['query'] } | undefined
          ) =>
            `${prefix}${PATH32}${
              option && option.query ? `?${dataToURLString(option.query)}` : ''
            }`,
        },
        themes: {
          _stylesheet: (val3: string) => {
            const prefix3 = `${PATH33}/${val3}`

            return {
              /**
               * @returns OK
               */
              get: (option?: { config?: T | undefined } | undefined) =>
                fetch<Methods77['get']['resBody'], BasicHeaders, Methods77['get']['status']>(
                  prefix,
                  prefix3,
                  GET,
                  option
                ).json(),
              /**
               * @returns OK
               */
              $get: (option?: { config?: T | undefined } | undefined) =>
                fetch<Methods77['get']['resBody'], BasicHeaders, Methods77['get']['status']>(
                  prefix,
                  prefix3,
                  GET,
                  option
                )
                  .json()
                  .then(r => r.body),
              $path: () => `${prefix}${prefix3}`,
            }
          },
          /**
           * @returns OK
           */
          get: (
            option?:
              | { query?: Methods76['get']['query'] | undefined; config?: T | undefined }
              | undefined
          ) =>
            fetch<Methods76['get']['resBody'], BasicHeaders, Methods76['get']['status']>(
              prefix,
              PATH33,
              GET,
              option
            ).json(),
          /**
           * @returns OK
           */
          $get: (
            option?:
              | { query?: Methods76['get']['query'] | undefined; config?: T | undefined }
              | undefined
          ) =>
            fetch<Methods76['get']['resBody'], BasicHeaders, Methods76['get']['status']>(
              prefix,
              PATH33,
              GET,
              option
            )
              .json()
              .then(r => r.body),
          $path: (
            option?: { method?: 'get' | undefined; query: Methods76['get']['query'] } | undefined
          ) =>
            `${prefix}${PATH33}${
              option && option.query ? `?${dataToURLString(option.query)}` : ''
            }`,
        },
        types: {
          _type: (val3: string) => {
            const prefix3 = `${PATH34}/${val3}`

            return {
              /**
               * @returns OK
               */
              get: (
                option?:
                  | { query?: Methods79['get']['query'] | undefined; config?: T | undefined }
                  | undefined
              ) =>
                fetch<Methods79['get']['resBody'], BasicHeaders, Methods79['get']['status']>(
                  prefix,
                  prefix3,
                  GET,
                  option
                ).json(),
              /**
               * @returns OK
               */
              $get: (
                option?:
                  | { query?: Methods79['get']['query'] | undefined; config?: T | undefined }
                  | undefined
              ) =>
                fetch<Methods79['get']['resBody'], BasicHeaders, Methods79['get']['status']>(
                  prefix,
                  prefix3,
                  GET,
                  option
                )
                  .json()
                  .then(r => r.body),
              $path: (
                option?:
                  | { method?: 'get' | undefined; query: Methods79['get']['query'] }
                  | undefined
              ) =>
                `${prefix}${prefix3}${
                  option && option.query ? `?${dataToURLString(option.query)}` : ''
                }`,
            }
          },
          /**
           * @returns OK
           */
          get: (
            option?:
              | { query?: Methods78['get']['query'] | undefined; config?: T | undefined }
              | undefined
          ) =>
            fetch<Methods78['get']['resBody'], BasicHeaders, Methods78['get']['status']>(
              prefix,
              PATH34,
              GET,
              option
            ).json(),
          /**
           * @returns OK
           */
          $get: (
            option?:
              | { query?: Methods78['get']['query'] | undefined; config?: T | undefined }
              | undefined
          ) =>
            fetch<Methods78['get']['resBody'], BasicHeaders, Methods78['get']['status']>(
              prefix,
              PATH34,
              GET,
              option
            )
              .json()
              .then(r => r.body),
          $path: (
            option?: { method?: 'get' | undefined; query: Methods78['get']['query'] } | undefined
          ) =>
            `${prefix}${PATH34}${
              option && option.query ? `?${dataToURLString(option.query)}` : ''
            }`,
        },
        users: {
          _id: (val3: string) => {
            const prefix3 = `${PATH35}/${val3}`

            return {
              /**
               * @returns OK
               */
              get: (
                option?:
                  | { query?: Methods81['get']['query'] | undefined; config?: T | undefined }
                  | undefined
              ) =>
                fetch<Methods81['get']['resBody'], BasicHeaders, Methods81['get']['status']>(
                  prefix,
                  prefix3,
                  GET,
                  option
                ).json(),
              /**
               * @returns OK
               */
              $get: (
                option?:
                  | { query?: Methods81['get']['query'] | undefined; config?: T | undefined }
                  | undefined
              ) =>
                fetch<Methods81['get']['resBody'], BasicHeaders, Methods81['get']['status']>(
                  prefix,
                  prefix3,
                  GET,
                  option
                )
                  .json()
                  .then(r => r.body),
              /**
               * @returns OK
               */
              post: (option: { body: Methods81['post']['reqBody']; config?: T | undefined }) =>
                fetch<Methods81['post']['resBody'], BasicHeaders, Methods81['post']['status']>(
                  prefix,
                  prefix3,
                  POST,
                  option,
                  'URLSearchParams'
                ).json(),
              /**
               * @returns OK
               */
              $post: (option: { body: Methods81['post']['reqBody']; config?: T | undefined }) =>
                fetch<Methods81['post']['resBody'], BasicHeaders, Methods81['post']['status']>(
                  prefix,
                  prefix3,
                  POST,
                  option,
                  'URLSearchParams'
                )
                  .json()
                  .then(r => r.body),
              /**
               * @returns OK
               */
              put: (option: { body: Methods81['put']['reqBody']; config?: T | undefined }) =>
                fetch<Methods81['put']['resBody'], BasicHeaders, Methods81['put']['status']>(
                  prefix,
                  prefix3,
                  PUT,
                  option,
                  'URLSearchParams'
                ).json(),
              /**
               * @returns OK
               */
              $put: (option: { body: Methods81['put']['reqBody']; config?: T | undefined }) =>
                fetch<Methods81['put']['resBody'], BasicHeaders, Methods81['put']['status']>(
                  prefix,
                  prefix3,
                  PUT,
                  option,
                  'URLSearchParams'
                )
                  .json()
                  .then(r => r.body),
              /**
               * @returns OK
               */
              patch: (option: { body: Methods81['patch']['reqBody']; config?: T | undefined }) =>
                fetch<Methods81['patch']['resBody'], BasicHeaders, Methods81['patch']['status']>(
                  prefix,
                  prefix3,
                  PATCH,
                  option,
                  'URLSearchParams'
                ).json(),
              /**
               * @returns OK
               */
              $patch: (option: { body: Methods81['patch']['reqBody']; config?: T | undefined }) =>
                fetch<Methods81['patch']['resBody'], BasicHeaders, Methods81['patch']['status']>(
                  prefix,
                  prefix3,
                  PATCH,
                  option,
                  'URLSearchParams'
                )
                  .json()
                  .then(r => r.body),
              /**
               * @returns OK
               */
              delete: (option: { body: Methods81['delete']['reqBody']; config?: T | undefined }) =>
                fetch<Methods81['delete']['resBody'], BasicHeaders, Methods81['delete']['status']>(
                  prefix,
                  prefix3,
                  DELETE,
                  option,
                  'URLSearchParams'
                ).json(),
              /**
               * @returns OK
               */
              $delete: (option: { body: Methods81['delete']['reqBody']; config?: T | undefined }) =>
                fetch<Methods81['delete']['resBody'], BasicHeaders, Methods81['delete']['status']>(
                  prefix,
                  prefix3,
                  DELETE,
                  option,
                  'URLSearchParams'
                )
                  .json()
                  .then(r => r.body),
              $path: (
                option?:
                  | { method?: 'get' | undefined; query: Methods81['get']['query'] }
                  | undefined
              ) =>
                `${prefix}${prefix3}${
                  option && option.query ? `?${dataToURLString(option.query)}` : ''
                }`,
            }
          },
          _user_id: (val3: string) => {
            const prefix3 = `${PATH35}/${val3}`

            return {
              application_passwords: {
                _uuid: (val5: string) => {
                  const prefix5 = `${prefix3}${PATH36}/${val5}`

                  return {
                    /**
                     * @returns OK
                     */
                    get: (
                      option?:
                        | { query?: Methods83['get']['query'] | undefined; config?: T | undefined }
                        | undefined
                    ) =>
                      fetch<Methods83['get']['resBody'], BasicHeaders, Methods83['get']['status']>(
                        prefix,
                        prefix5,
                        GET,
                        option
                      ).json(),
                    /**
                     * @returns OK
                     */
                    $get: (
                      option?:
                        | { query?: Methods83['get']['query'] | undefined; config?: T | undefined }
                        | undefined
                    ) =>
                      fetch<Methods83['get']['resBody'], BasicHeaders, Methods83['get']['status']>(
                        prefix,
                        prefix5,
                        GET,
                        option
                      )
                        .json()
                        .then(r => r.body),
                    /**
                     * @returns OK
                     */
                    post: (option: {
                      body: Methods83['post']['reqBody']
                      config?: T | undefined
                    }) =>
                      fetch<
                        Methods83['post']['resBody'],
                        BasicHeaders,
                        Methods83['post']['status']
                      >(prefix, prefix5, POST, option, 'URLSearchParams').json(),
                    /**
                     * @returns OK
                     */
                    $post: (option: {
                      body: Methods83['post']['reqBody']
                      config?: T | undefined
                    }) =>
                      fetch<
                        Methods83['post']['resBody'],
                        BasicHeaders,
                        Methods83['post']['status']
                      >(prefix, prefix5, POST, option, 'URLSearchParams')
                        .json()
                        .then(r => r.body),
                    /**
                     * @returns OK
                     */
                    put: (option: { body: Methods83['put']['reqBody']; config?: T | undefined }) =>
                      fetch<Methods83['put']['resBody'], BasicHeaders, Methods83['put']['status']>(
                        prefix,
                        prefix5,
                        PUT,
                        option,
                        'URLSearchParams'
                      ).json(),
                    /**
                     * @returns OK
                     */
                    $put: (option: { body: Methods83['put']['reqBody']; config?: T | undefined }) =>
                      fetch<Methods83['put']['resBody'], BasicHeaders, Methods83['put']['status']>(
                        prefix,
                        prefix5,
                        PUT,
                        option,
                        'URLSearchParams'
                      )
                        .json()
                        .then(r => r.body),
                    /**
                     * @returns OK
                     */
                    patch: (option: {
                      body: Methods83['patch']['reqBody']
                      config?: T | undefined
                    }) =>
                      fetch<
                        Methods83['patch']['resBody'],
                        BasicHeaders,
                        Methods83['patch']['status']
                      >(prefix, prefix5, PATCH, option, 'URLSearchParams').json(),
                    /**
                     * @returns OK
                     */
                    $patch: (option: {
                      body: Methods83['patch']['reqBody']
                      config?: T | undefined
                    }) =>
                      fetch<
                        Methods83['patch']['resBody'],
                        BasicHeaders,
                        Methods83['patch']['status']
                      >(prefix, prefix5, PATCH, option, 'URLSearchParams')
                        .json()
                        .then(r => r.body),
                    /**
                     * @returns OK
                     */
                    delete: (option?: { config?: T | undefined } | undefined) =>
                      fetch<
                        Methods83['delete']['resBody'],
                        BasicHeaders,
                        Methods83['delete']['status']
                      >(prefix, prefix5, DELETE, option).json(),
                    /**
                     * @returns OK
                     */
                    $delete: (option?: { config?: T | undefined } | undefined) =>
                      fetch<
                        Methods83['delete']['resBody'],
                        BasicHeaders,
                        Methods83['delete']['status']
                      >(prefix, prefix5, DELETE, option)
                        .json()
                        .then(r => r.body),
                    $path: (
                      option?:
                        | { method?: 'get' | undefined; query: Methods83['get']['query'] }
                        | undefined
                    ) =>
                      `${prefix}${prefix5}${
                        option && option.query ? `?${dataToURLString(option.query)}` : ''
                      }`,
                  }
                },
                introspect: {
                  /**
                   * @returns OK
                   */
                  get: (
                    option?:
                      | { query?: Methods84['get']['query'] | undefined; config?: T | undefined }
                      | undefined
                  ) =>
                    fetch<Methods84['get']['resBody'], BasicHeaders, Methods84['get']['status']>(
                      prefix,
                      `${prefix3}${PATH37}`,
                      GET,
                      option
                    ).json(),
                  /**
                   * @returns OK
                   */
                  $get: (
                    option?:
                      | { query?: Methods84['get']['query'] | undefined; config?: T | undefined }
                      | undefined
                  ) =>
                    fetch<Methods84['get']['resBody'], BasicHeaders, Methods84['get']['status']>(
                      prefix,
                      `${prefix3}${PATH37}`,
                      GET,
                      option
                    )
                      .json()
                      .then(r => r.body),
                  $path: (
                    option?:
                      | { method?: 'get' | undefined; query: Methods84['get']['query'] }
                      | undefined
                  ) =>
                    `${prefix}${prefix3}${PATH37}${
                      option && option.query ? `?${dataToURLString(option.query)}` : ''
                    }`,
                },
                /**
                 * @returns OK
                 */
                get: (
                  option?:
                    | { query?: Methods82['get']['query'] | undefined; config?: T | undefined }
                    | undefined
                ) =>
                  fetch<Methods82['get']['resBody'], BasicHeaders, Methods82['get']['status']>(
                    prefix,
                    `${prefix3}${PATH36}`,
                    GET,
                    option
                  ).json(),
                /**
                 * @returns OK
                 */
                $get: (
                  option?:
                    | { query?: Methods82['get']['query'] | undefined; config?: T | undefined }
                    | undefined
                ) =>
                  fetch<Methods82['get']['resBody'], BasicHeaders, Methods82['get']['status']>(
                    prefix,
                    `${prefix3}${PATH36}`,
                    GET,
                    option
                  )
                    .json()
                    .then(r => r.body),
                /**
                 * @returns OK
                 */
                post: (option: { body: Methods82['post']['reqBody']; config?: T | undefined }) =>
                  fetch<Methods82['post']['resBody'], BasicHeaders, Methods82['post']['status']>(
                    prefix,
                    `${prefix3}${PATH36}`,
                    POST,
                    option,
                    'URLSearchParams'
                  ).json(),
                /**
                 * @returns OK
                 */
                $post: (option: { body: Methods82['post']['reqBody']; config?: T | undefined }) =>
                  fetch<Methods82['post']['resBody'], BasicHeaders, Methods82['post']['status']>(
                    prefix,
                    `${prefix3}${PATH36}`,
                    POST,
                    option,
                    'URLSearchParams'
                  )
                    .json()
                    .then(r => r.body),
                /**
                 * @returns OK
                 */
                delete: (option?: { config?: T | undefined } | undefined) =>
                  fetch<
                    Methods82['delete']['resBody'],
                    BasicHeaders,
                    Methods82['delete']['status']
                  >(prefix, `${prefix3}${PATH36}`, DELETE, option).json(),
                /**
                 * @returns OK
                 */
                $delete: (option?: { config?: T | undefined } | undefined) =>
                  fetch<
                    Methods82['delete']['resBody'],
                    BasicHeaders,
                    Methods82['delete']['status']
                  >(prefix, `${prefix3}${PATH36}`, DELETE, option)
                    .json()
                    .then(r => r.body),
                $path: (
                  option?:
                    | { method?: 'get' | undefined; query: Methods82['get']['query'] }
                    | undefined
                ) =>
                  `${prefix}${prefix3}${PATH36}${
                    option && option.query ? `?${dataToURLString(option.query)}` : ''
                  }`,
              },
            }
          },
          me: {
            /**
             * @returns OK
             */
            get: (
              option?:
                | { query?: Methods85['get']['query'] | undefined; config?: T | undefined }
                | undefined
            ) =>
              fetch<Methods85['get']['resBody'], BasicHeaders, Methods85['get']['status']>(
                prefix,
                PATH38,
                GET,
                option
              ).json(),
            /**
             * @returns OK
             */
            $get: (
              option?:
                | { query?: Methods85['get']['query'] | undefined; config?: T | undefined }
                | undefined
            ) =>
              fetch<Methods85['get']['resBody'], BasicHeaders, Methods85['get']['status']>(
                prefix,
                PATH38,
                GET,
                option
              )
                .json()
                .then(r => r.body),
            /**
             * @returns OK
             */
            post: (option: { body: Methods85['post']['reqBody']; config?: T | undefined }) =>
              fetch<Methods85['post']['resBody'], BasicHeaders, Methods85['post']['status']>(
                prefix,
                PATH38,
                POST,
                option,
                'URLSearchParams'
              ).json(),
            /**
             * @returns OK
             */
            $post: (option: { body: Methods85['post']['reqBody']; config?: T | undefined }) =>
              fetch<Methods85['post']['resBody'], BasicHeaders, Methods85['post']['status']>(
                prefix,
                PATH38,
                POST,
                option,
                'URLSearchParams'
              )
                .json()
                .then(r => r.body),
            /**
             * @returns OK
             */
            put: (option: { body: Methods85['put']['reqBody']; config?: T | undefined }) =>
              fetch<Methods85['put']['resBody'], BasicHeaders, Methods85['put']['status']>(
                prefix,
                PATH38,
                PUT,
                option,
                'URLSearchParams'
              ).json(),
            /**
             * @returns OK
             */
            $put: (option: { body: Methods85['put']['reqBody']; config?: T | undefined }) =>
              fetch<Methods85['put']['resBody'], BasicHeaders, Methods85['put']['status']>(
                prefix,
                PATH38,
                PUT,
                option,
                'URLSearchParams'
              )
                .json()
                .then(r => r.body),
            /**
             * @returns OK
             */
            patch: (option: { body: Methods85['patch']['reqBody']; config?: T | undefined }) =>
              fetch<Methods85['patch']['resBody'], BasicHeaders, Methods85['patch']['status']>(
                prefix,
                PATH38,
                PATCH,
                option,
                'URLSearchParams'
              ).json(),
            /**
             * @returns OK
             */
            $patch: (option: { body: Methods85['patch']['reqBody']; config?: T | undefined }) =>
              fetch<Methods85['patch']['resBody'], BasicHeaders, Methods85['patch']['status']>(
                prefix,
                PATH38,
                PATCH,
                option,
                'URLSearchParams'
              )
                .json()
                .then(r => r.body),
            /**
             * @returns OK
             */
            delete: (option: { body: Methods85['delete']['reqBody']; config?: T | undefined }) =>
              fetch<Methods85['delete']['resBody'], BasicHeaders, Methods85['delete']['status']>(
                prefix,
                PATH38,
                DELETE,
                option,
                'URLSearchParams'
              ).json(),
            /**
             * @returns OK
             */
            $delete: (option: { body: Methods85['delete']['reqBody']; config?: T | undefined }) =>
              fetch<Methods85['delete']['resBody'], BasicHeaders, Methods85['delete']['status']>(
                prefix,
                PATH38,
                DELETE,
                option,
                'URLSearchParams'
              )
                .json()
                .then(r => r.body),
            $path: (
              option?: { method?: 'get' | undefined; query: Methods85['get']['query'] } | undefined
            ) =>
              `${prefix}${PATH38}${
                option && option.query ? `?${dataToURLString(option.query)}` : ''
              }`,
          },
          /**
           * @returns OK
           */
          get: (
            option?:
              | { query?: Methods80['get']['query'] | undefined; config?: T | undefined }
              | undefined
          ) =>
            fetch<Methods80['get']['resBody'], BasicHeaders, Methods80['get']['status']>(
              prefix,
              PATH35,
              GET,
              option
            ).json(),
          /**
           * @returns OK
           */
          $get: (
            option?:
              | { query?: Methods80['get']['query'] | undefined; config?: T | undefined }
              | undefined
          ) =>
            fetch<Methods80['get']['resBody'], BasicHeaders, Methods80['get']['status']>(
              prefix,
              PATH35,
              GET,
              option
            )
              .json()
              .then(r => r.body),
          /**
           * @returns OK
           */
          post: (option: { body: Methods80['post']['reqBody']; config?: T | undefined }) =>
            fetch<Methods80['post']['resBody'], BasicHeaders, Methods80['post']['status']>(
              prefix,
              PATH35,
              POST,
              option,
              'URLSearchParams'
            ).json(),
          /**
           * @returns OK
           */
          $post: (option: { body: Methods80['post']['reqBody']; config?: T | undefined }) =>
            fetch<Methods80['post']['resBody'], BasicHeaders, Methods80['post']['status']>(
              prefix,
              PATH35,
              POST,
              option,
              'URLSearchParams'
            )
              .json()
              .then(r => r.body),
          $path: (
            option?: { method?: 'get' | undefined; query: Methods80['get']['query'] } | undefined
          ) =>
            `${prefix}${PATH35}${
              option && option.query ? `?${dataToURLString(option.query)}` : ''
            }`,
        },
        widget_types: {
          _id: (val3: string) => {
            const prefix3 = `${PATH39}/${val3}`

            return {
              encode: {
                post: (option: { body: Methods88['post']['reqBody']; config?: T | undefined }) =>
                  fetch<void, BasicHeaders, Methods88['post']['status']>(
                    prefix,
                    `${prefix3}${PATH40}`,
                    POST,
                    option,
                    'URLSearchParams'
                  ).send(),
                $post: (option: { body: Methods88['post']['reqBody']; config?: T | undefined }) =>
                  fetch<void, BasicHeaders, Methods88['post']['status']>(
                    prefix,
                    `${prefix3}${PATH40}`,
                    POST,
                    option,
                    'URLSearchParams'
                  )
                    .send()
                    .then(r => r.body),
                $path: () => `${prefix}${prefix3}${PATH40}`,
              },
              render: {
                post: (option: { body: Methods89['post']['reqBody']; config?: T | undefined }) =>
                  fetch<void, BasicHeaders, Methods89['post']['status']>(
                    prefix,
                    `${prefix3}${PATH41}`,
                    POST,
                    option,
                    'URLSearchParams'
                  ).send(),
                $post: (option: { body: Methods89['post']['reqBody']; config?: T | undefined }) =>
                  fetch<void, BasicHeaders, Methods89['post']['status']>(
                    prefix,
                    `${prefix3}${PATH41}`,
                    POST,
                    option,
                    'URLSearchParams'
                  )
                    .send()
                    .then(r => r.body),
                $path: () => `${prefix}${prefix3}${PATH41}`,
              },
              /**
               * @returns OK
               */
              get: (
                option?:
                  | { query?: Methods87['get']['query'] | undefined; config?: T | undefined }
                  | undefined
              ) =>
                fetch<Methods87['get']['resBody'], BasicHeaders, Methods87['get']['status']>(
                  prefix,
                  prefix3,
                  GET,
                  option
                ).json(),
              /**
               * @returns OK
               */
              $get: (
                option?:
                  | { query?: Methods87['get']['query'] | undefined; config?: T | undefined }
                  | undefined
              ) =>
                fetch<Methods87['get']['resBody'], BasicHeaders, Methods87['get']['status']>(
                  prefix,
                  prefix3,
                  GET,
                  option
                )
                  .json()
                  .then(r => r.body),
              $path: (
                option?:
                  | { method?: 'get' | undefined; query: Methods87['get']['query'] }
                  | undefined
              ) =>
                `${prefix}${prefix3}${
                  option && option.query ? `?${dataToURLString(option.query)}` : ''
                }`,
            }
          },
          /**
           * @returns OK
           */
          get: (
            option?:
              | { query?: Methods86['get']['query'] | undefined; config?: T | undefined }
              | undefined
          ) =>
            fetch<Methods86['get']['resBody'], BasicHeaders, Methods86['get']['status']>(
              prefix,
              PATH39,
              GET,
              option
            ).json(),
          /**
           * @returns OK
           */
          $get: (
            option?:
              | { query?: Methods86['get']['query'] | undefined; config?: T | undefined }
              | undefined
          ) =>
            fetch<Methods86['get']['resBody'], BasicHeaders, Methods86['get']['status']>(
              prefix,
              PATH39,
              GET,
              option
            )
              .json()
              .then(r => r.body),
          $path: (
            option?: { method?: 'get' | undefined; query: Methods86['get']['query'] } | undefined
          ) =>
            `${prefix}${PATH39}${
              option && option.query ? `?${dataToURLString(option.query)}` : ''
            }`,
        },
        widgets: {
          _id: (val3: string) => {
            const prefix3 = `${PATH42}/${val3}`

            return {
              /**
               * @returns OK
               */
              get: (
                option?:
                  | { query?: Methods91['get']['query'] | undefined; config?: T | undefined }
                  | undefined
              ) =>
                fetch<Methods91['get']['resBody'], BasicHeaders, Methods91['get']['status']>(
                  prefix,
                  prefix3,
                  GET,
                  option
                ).json(),
              /**
               * @returns OK
               */
              $get: (
                option?:
                  | { query?: Methods91['get']['query'] | undefined; config?: T | undefined }
                  | undefined
              ) =>
                fetch<Methods91['get']['resBody'], BasicHeaders, Methods91['get']['status']>(
                  prefix,
                  prefix3,
                  GET,
                  option
                )
                  .json()
                  .then(r => r.body),
              /**
               * @returns OK
               */
              post: (option: { body: Methods91['post']['reqBody']; config?: T | undefined }) =>
                fetch<Methods91['post']['resBody'], BasicHeaders, Methods91['post']['status']>(
                  prefix,
                  prefix3,
                  POST,
                  option,
                  'URLSearchParams'
                ).json(),
              /**
               * @returns OK
               */
              $post: (option: { body: Methods91['post']['reqBody']; config?: T | undefined }) =>
                fetch<Methods91['post']['resBody'], BasicHeaders, Methods91['post']['status']>(
                  prefix,
                  prefix3,
                  POST,
                  option,
                  'URLSearchParams'
                )
                  .json()
                  .then(r => r.body),
              /**
               * @returns OK
               */
              put: (option: { body: Methods91['put']['reqBody']; config?: T | undefined }) =>
                fetch<Methods91['put']['resBody'], BasicHeaders, Methods91['put']['status']>(
                  prefix,
                  prefix3,
                  PUT,
                  option,
                  'URLSearchParams'
                ).json(),
              /**
               * @returns OK
               */
              $put: (option: { body: Methods91['put']['reqBody']; config?: T | undefined }) =>
                fetch<Methods91['put']['resBody'], BasicHeaders, Methods91['put']['status']>(
                  prefix,
                  prefix3,
                  PUT,
                  option,
                  'URLSearchParams'
                )
                  .json()
                  .then(r => r.body),
              /**
               * @returns OK
               */
              patch: (option: { body: Methods91['patch']['reqBody']; config?: T | undefined }) =>
                fetch<Methods91['patch']['resBody'], BasicHeaders, Methods91['patch']['status']>(
                  prefix,
                  prefix3,
                  PATCH,
                  option,
                  'URLSearchParams'
                ).json(),
              /**
               * @returns OK
               */
              $patch: (option: { body: Methods91['patch']['reqBody']; config?: T | undefined }) =>
                fetch<Methods91['patch']['resBody'], BasicHeaders, Methods91['patch']['status']>(
                  prefix,
                  prefix3,
                  PATCH,
                  option,
                  'URLSearchParams'
                )
                  .json()
                  .then(r => r.body),
              /**
               * @returns OK
               */
              delete: (option: { body: Methods91['delete']['reqBody']; config?: T | undefined }) =>
                fetch<Methods91['delete']['resBody'], BasicHeaders, Methods91['delete']['status']>(
                  prefix,
                  prefix3,
                  DELETE,
                  option,
                  'URLSearchParams'
                ).json(),
              /**
               * @returns OK
               */
              $delete: (option: { body: Methods91['delete']['reqBody']; config?: T | undefined }) =>
                fetch<Methods91['delete']['resBody'], BasicHeaders, Methods91['delete']['status']>(
                  prefix,
                  prefix3,
                  DELETE,
                  option,
                  'URLSearchParams'
                )
                  .json()
                  .then(r => r.body),
              $path: (
                option?:
                  | { method?: 'get' | undefined; query: Methods91['get']['query'] }
                  | undefined
              ) =>
                `${prefix}${prefix3}${
                  option && option.query ? `?${dataToURLString(option.query)}` : ''
                }`,
            }
          },
          /**
           * @returns OK
           */
          get: (
            option?:
              | { query?: Methods90['get']['query'] | undefined; config?: T | undefined }
              | undefined
          ) =>
            fetch<Methods90['get']['resBody'], BasicHeaders, Methods90['get']['status']>(
              prefix,
              PATH42,
              GET,
              option
            ).json(),
          /**
           * @returns OK
           */
          $get: (
            option?:
              | { query?: Methods90['get']['query'] | undefined; config?: T | undefined }
              | undefined
          ) =>
            fetch<Methods90['get']['resBody'], BasicHeaders, Methods90['get']['status']>(
              prefix,
              PATH42,
              GET,
              option
            )
              .json()
              .then(r => r.body),
          /**
           * @returns OK
           */
          post: (option: { body: Methods90['post']['reqBody']; config?: T | undefined }) =>
            fetch<Methods90['post']['resBody'], BasicHeaders, Methods90['post']['status']>(
              prefix,
              PATH42,
              POST,
              option,
              'URLSearchParams'
            ).json(),
          /**
           * @returns OK
           */
          $post: (option: { body: Methods90['post']['reqBody']; config?: T | undefined }) =>
            fetch<Methods90['post']['resBody'], BasicHeaders, Methods90['post']['status']>(
              prefix,
              PATH42,
              POST,
              option,
              'URLSearchParams'
            )
              .json()
              .then(r => r.body),
          $path: (
            option?: { method?: 'get' | undefined; query: Methods90['get']['query'] } | undefined
          ) =>
            `${prefix}${PATH42}${
              option && option.query ? `?${dataToURLString(option.query)}` : ''
            }`,
        },
        get: (
          option?:
            | { query?: Methods0['get']['query'] | undefined; config?: T | undefined }
            | undefined
        ) =>
          fetch<void, BasicHeaders, Methods0['get']['status']>(prefix, PATH0, GET, option).send(),
        $get: (
          option?:
            | { query?: Methods0['get']['query'] | undefined; config?: T | undefined }
            | undefined
        ) =>
          fetch<void, BasicHeaders, Methods0['get']['status']>(prefix, PATH0, GET, option)
            .send()
            .then(r => r.body),
        $path: (
          option?: { method?: 'get' | undefined; query: Methods0['get']['query'] } | undefined
        ) =>
          `${prefix}${PATH0}${option && option.query ? `?${dataToURLString(option.query)}` : ''}`,
      },
    },
  }
}

export type ApiInstance = ReturnType<typeof api>
export default api
