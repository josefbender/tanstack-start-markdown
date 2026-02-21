import { Link, createFileRoute } from '@tanstack/react-router'
import { allPosts } from 'content-collections'

export const Route = createFileRoute('/')({
  component: App,
  loader: () => allPosts,
})

function App() {
  const posts = Route.useLoaderData()
  return (
    <div>
      {posts.map((post) => (
        <Link to="/$id" params={{ id: post.id }}>
          {post.title}
        </Link>
      ))}
    </div>
  )
}
