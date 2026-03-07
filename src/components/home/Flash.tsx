import { Section } from "../shared/section"
import Image from "next/image"

const Flash = () => {
    return (
        <Section className="w-full relative h-[400px] tablet:h-[686px] pt-16">
            <div className="relative w-full h-full rounded-[var(--radius-xl)] overflow-hidden">
                <Image
                    src="/homepage/059a3882520dc15f89884aa9adf2a9548d6e1bb1.png"
                    alt="Flash"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
                    priority
                    className="object-cover"
                />
            </div>
        </Section>
    )
}

export default Flash