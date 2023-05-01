import { previewData } from "next/headers";
import { homepage, projectList } from "../../../lib/queries";
import { client } from "../../../lib/sanity.client";
import PreviewSuspense from "../../../components/PreviewSuspense"
import ProjectList from "../../../components/ProjectList";
import PreviewProjectList from "../../../components/PreviewProjectList";
import { Metadata } from "next";
import GradientShadow from "@/components/GradientShadow";
import Image from "next/image";
import urlFor from "@/lib/urlFor";

export const revalidate = 60;

export default async function Home() {
    const data = await client.fetch(homepage)
    const projects = await client.fetch(projectList)
    const numbers = [1,2,3,4,5,6]
    const tech = data.pageData[0].tech
    if (previewData()) {
        return (
            <PreviewSuspense fallback={(
                <div role='status'>
                    <p className="text-center text-lg animate-pulse">
                        Loading Preview Data...
                    </p>
                </div>
            )}>
                {/* PreviewProjectList */}
                <PreviewProjectList query={projectList} />
            </PreviewSuspense>
        )
    }

    
    // console.log(projects)
    return (
        <div>
            <div className='grid grid-cols-3 gap-4 md:gap-8 md:grid-cols-4'>
                {tech.map((item: any, index: any) => (
                    <GradientShadow key={index}>
                        <Image 
                            src={urlFor(item.image.image).url()}
                            alt={item.image.alt}
                            height={100}
                            width={100}
                            className='w-14 z-50'
                        />
                        {item.title}
                    </GradientShadow> 
                ))}
            </div>
            <ProjectList projects={projects} />
        </div>
    )
}