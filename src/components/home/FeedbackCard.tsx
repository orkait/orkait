import { Card, CardContent } from "@/components/ui/card";

export type FeedbackCardProps = {
    quote: string;
    name: string;
    company: string;
    width?: number;
    height?: number;
};

const FeedbackCard = ({ quote, name, company, width = 600, height = 530 }: FeedbackCardProps) => {
    return (
        <Card
            className="shrink-0 rounded-sm flex flex-col justify-between select-none"
            style={{ width, height }}
        >
            <CardContent className="flex flex-col justify-between h-full p-6">
                {/* Quote */}
                <p className="text-foreground font-medium text-subtitle leading-subtitle max-w-[360px]">
                    {quote}
                </p>

                {/* Attribution */}
                <div className="flex flex-col gap-1">
                    <p className="text-foreground font-medium text-body leading-body">
                        {name}
                    </p>
                    <p className="text-muted-foreground font-medium text-body leading-body">
                        {company}
                    </p>
                </div>
            </CardContent>
        </Card>
    );
};

export default FeedbackCard;
