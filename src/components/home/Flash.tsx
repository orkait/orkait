import { Section } from "../shared/section"
import Image from "next/image"

const Flash = () => {
    return (
        <div className="w-[100vw] h-[204px] -ml-4 mt-5 tablet:mt-0 tablet:ml-0 tablet:w-full tablet:h-[400px] laptop:h-[686px] flex tablet:px-0">
            <div className="relative w-full h-full overflow-hidden">
                <Image
                    src="/homepage/059a3882520dc15f89884aa9adf2a9548d6e1bb1.png"
                    alt="Orkait engineering workspace"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
                    priority
                    className="object-cover"
                />
            </div>
        </div>
    )
}

export default Flash