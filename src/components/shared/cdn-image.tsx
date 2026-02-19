import Image, { type ImageProps } from "next/image";
import { cn } from "@/lib/utils";

type CdnImageProps = Omit<ImageProps, "src"> & {
	src: string;
};

export function CdnImage({ className, alt, ...props }: CdnImageProps) {
	return <Image className={cn(className)} alt={alt} {...props} />;
}
