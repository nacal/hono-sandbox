import { Hono } from 'hono'
import { basicAuth } from 'hono/basic-auth'
// import { serveStatic } from 'hono/cloudflare-workers'
// import manifest from '__STATIC_CONTENT_MANIFEST'

const app = new Hono()

// app.get('/static/*', serveStatic({ root: './', manifest }))
// app.get('/favicon.ico', serveStatic({ path: './favicon.ico', manifest }))

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.get('/api/hello', (c) => {
  return c.json({
    ok: true,
    message: 'Hello Hono!',
  })
})

app.get('/posts/:id', (c) => {
  const page = c.req.query('page')
  const id = c.req.param('id')
  c.header('X-Message', 'Hi!')
  return c.text(`You want see ${page} of ${id}`)
})
app.post('/posts', (c) => c.text('Created!', 201))
app.delete('/posts/:id', (c) => c.text(`${c.req.param('id')} is deleted!`))

app.get('/raw', (c) => {
  return new Response('Good morning!')
})

app.use(
  '/admin/*',
  basicAuth({
    username: 'admin',
    password: 'secret',
  })
)

app.get('/admin', (c) => {
  return c.text('You are authorized!')
})

export default app
