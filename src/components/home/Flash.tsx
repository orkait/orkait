import { Section } from "../shared/section"
import Image from "next/image"

const Flash = () => {
    return (
        <div className="w-full h-full mt-16">
            <Section className="relative w-full h-[686px]">
                <div className="">
                    <Image
                        src="https://placehold.co/600x400/webp"
                        alt="Flash"
                        fill
                        className="object-cover"
                    />
                </div>
            </Section>
        </div>
    )
}

export default Flash