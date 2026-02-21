import { createFileRoute, notFound } from '@tanstack/react-router'
import { allPosts } from 'content-collections'
import { Markdown } from '@/components/markdown'

export const Route = createFileRoute('/$id')({
  component: RouteComponent,
  loader: ({ params }) => {
    const post = allPosts.find((p) => p.id === params.id)
    if (!post) {
      throw notFound()
    }
    return post
  },
})

function RouteComponent() {
  const post = Route.useLoaderData()
  return (
    <div className="prose prose-invert p-4 md:p-8 mx-auto ">
      <h1>{post.title}</h1>
      {post.type === 'video' && (
        <iframe
          src={'https://www.youtube.com/embed/' + post.youtubeVideoId}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          className="w-full aspect-video"
        ></iframe>
      )}
      <Markdown content={post.content} />
    </div>
  )
}
