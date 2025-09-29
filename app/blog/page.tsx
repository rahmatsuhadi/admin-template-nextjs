import { _posts } from "@/_mock";
import { BlogView } from "@/sections/blog/view";

export default function BlogPage() {
    return (
        <>
            <title>{`Blog - `}</title>

            <BlogView posts={_posts} />
        </>
    )
}