import { Card, CardContent } from "@/components/ui/card";

export type FeedbackCardProps = {
    quote: string;
    name: string;
    company: string;
};

const FeedbackCard = ({ quote, name, company }: FeedbackCardProps) => {
    return (
        <Card
            className="shrink-0 rounded-lg flex flex-col justify-between select-none h-auto min-h-[300px] tablet:min-h-[400px] tablet:h-[530px] w-full border border-[#e8e8e8] tablet:border-border"
        >
            <CardContent className="flex flex-col justify-between h-full p-[16px] tablet:p-6 pb-[24px]">
                {/* Quote */}
                <p className="text-[#111] dark:text-[#eee] tablet:text-foreground font-medium text-[14px] leading-[20px] tablet:text-subtitle tablet:leading-subtitle tablet:max-w-[360px] text-wrap break-words">
                    &ldquo;{quote}&rdquo;
                </p>

                {/* Attribution */}
                <div className="flex flex-col gap-[8px] tablet:gap-1 mt-[32px] tablet:mt-0">
                    <p className="text-foreground font-medium text-[10px] leading-[14px] tablet:text-body tablet:leading-body">
                        {name}
                    </p>
                    <p className="text-foreground tablet:text-muted-foreground font-medium text-[10px] leading-[14px] tablet:text-body tablet:leading-body">
                        {company}
                    </p>
                </div>
            </CardContent>
        </Card>
    );
};

export default FeedbackCard;
