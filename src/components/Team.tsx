import Image from "next/image";
import { TEAM_MEMBERS, type TeamMember } from "@/data/team";

const ACTIVE_MEMBERS = TEAM_MEMBERS.filter((m) => !m.alumni);
const ALUMNI_MEMBERS = TEAM_MEMBERS.filter((m) => m.alumni);

function TeamMemberCard({ member, index }: { member: TeamMember; index: number }) {
    return (
        <article className="group w-[240px] relative overflow-hidden rounded-lg cursor-default transition-shadow duration-300 hover:shadow-lg">
            <div className="relative aspect-[3/4]">
                <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover grayscale transition-all duration-500 group-hover:grayscale-0 group-hover:scale-105"
                    sizes="240px"
                    priority={index < 4}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-5">
                    <h2 className="text-body-lg font-medium leading-body-lg text-white">
                        {member.name}
                    </h2>
                    <p className="text-body font-medium leading-body text-white/70">
                        {member.role}
                    </p>
                </div>
            </div>
        </article>
    );
}

function AlumniCard({ member }: { member: TeamMember }) {
    return (
        <article className="w-[180px] relative overflow-hidden rounded-lg opacity-60 hover:opacity-80 transition-opacity duration-300">
            <div className="relative aspect-[3/4]">
                <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover grayscale"
                    sizes="180px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h2 className="text-body font-medium leading-body text-white">
                        {member.name}
                    </h2>
                    <p className="text-xs font-medium text-white/60">
                        {member.role}
                    </p>
                </div>
            </div>
        </article>
    );
}

export default function Team() {
    return (
        <section className="bg-background px-4 py-16 tablet:px-8 laptop:px-12 base:px-16">
            <div className="flex flex-col gap-16">
                <div className="flex flex-col gap-12">
                    <header className="flex flex-col gap-3">
                        <p className="text-body font-medium uppercase tracking-[0.2em] text-muted-foreground">
                            OUR TEAM
                        </p>
                        <h1 className="text-title-3 font-bold leading-title-3 text-foreground tablet:text-title-2 tablet:leading-title-2">
                            The people building Orkait.
                        </h1>
                    </header>

                    <div className="flex flex-wrap gap-4">
                        {ACTIVE_MEMBERS.map((member, index) => (
                            <TeamMemberCard key={member.name} member={member} index={index} />
                        ))}
                    </div>
                </div>

                {ALUMNI_MEMBERS.length > 0 ? (
                    <div className="flex flex-col gap-8">
                        <header className="flex flex-col gap-2">
                            <p className="text-body font-medium uppercase tracking-[0.2em] text-muted-foreground">
                                ALUMNI
                            </p>
                            <h2 className="text-title-3 font-bold leading-title-3 text-foreground">
                                People who helped shape Orkait.
                            </h2>
                        </header>

                        <div className="flex flex-wrap gap-4">
                            {ALUMNI_MEMBERS.map((member) => (
                                <AlumniCard key={member.name} member={member} />
                            ))}
                        </div>
                    </div>
                ) : null}
            </div>
        </section>
    );
}
