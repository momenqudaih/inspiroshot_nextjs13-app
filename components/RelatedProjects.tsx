import { ProjectInterface, UserProfile } from '@/common.types';
import { getUserProjects } from '@/lib/actions';
import Image from 'next/image';
import Link from 'next/link';

type Props = {
    userId: string;
    projectId: string;
};

const RelatedProjects = async ({ userId, projectId }: Props) => {
    const result = (await getUserProjects(userId)) as {
        user: UserProfile;
    };

    const userProjects = result?.user?.projects?.edges?.filter(
        ({ node }: { node: ProjectInterface }) => node?.id !== projectId,
    );

    if (!userProjects?.length) {
        return (
            <>
                <div className="flexStart w-full mt-20">
                    <p className="texr-base font-bold">
                        More by {result?.user?.name}
                    </p>
                </div>
                <section className="mt-20 text-center">
                    <p>This user doesn't have any other projects.</p>
                </section>
            </>
        );
    }

    return (
        <section className="flex flex-col mt-32 w-full">
            <div className="flexBetween">
                <p className="texr-base font-bold">
                    More by {result?.user?.name}
                </p>
                <Link
                    href={`/profile/${result?.user?.id}`}
                    className="text-primary-purple text-base"
                >
                    View All Projects
                </Link>
            </div>
            <div className="related_projects-grid">
                {userProjects?.map(({ node }: { node: ProjectInterface }) => (
                    <div className="flexCenter related_project-card drop-shadow-card">
                        <Link
                            href={`/project/${node?.id}`}
                            className="flexCenter group relative w-full h-full"
                        >
                            <Image
                                src={node?.image}
                                width={414}
                                height={314}
                                className="w-full h-full object-cover rounded-2xl"
                                alt="project image"
                            />
                            <div className="hidden group-hover:flex related_project-card_title">
                                <p className="w-full">{node?.title}</p>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default RelatedProjects;
