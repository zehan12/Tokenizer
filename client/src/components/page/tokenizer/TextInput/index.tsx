import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Copy } from "lucide-react";
import { memo, type FC, type TargetedEvent } from "preact/compat";

interface TextInputProps {
    mode: "encode" | "decode";
    tokenIds: string;
    inputText: string;
    copyToClipboard: (item: string) => void;
    setInputText: (event: string) => void;
    setTokenIds: (event: string) => void;
}

export const TextInput: FC<TextInputProps> =
    memo((
        {
            mode,
            tokenIds,
            inputText,
            copyToClipboard,
            setInputText,
            setTokenIds
        }
    ) => {
        return (<>
            <Card className="flex flex-col">
                <CardHeader className="flex-shrink-0">
                    <CardTitle className="flex items-center justify-between">
                        {mode === "encode" ? "Text Input" : "Tokens Input"}
                        <div className="flex items-center gap-2">
                            {mode === "decode" && (
                                <span className="text-sm text-muted-foreground">
                                    {tokenIds.split(/[,\s]+/).filter((id) => id.trim() && !isNaN(Number(id.trim()))).length}{" "}
                                    Characters
                                </span>
                            )}
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => copyToClipboard(mode === "encode" ? inputText : tokenIds)}
                            >
                                <Copy className="w-4 h-4" />
                            </Button>
                        </div>
                    </CardTitle>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col">
                    {mode === "encode" ? (
                        <Textarea
                            value={inputText}
                            onChange={(e: TargetedEvent<HTMLTextAreaElement, Event>) => {
                                const target = e.target;
                                if (target instanceof HTMLTextAreaElement) {
                                    setInputText(target.value);
                                }
                            }} placeholder="Enter text to tokenize..."
                            className="h-full font-mono text-sm resize-none"
                        />
                    ) : (
                        <Textarea
                            value={tokenIds}
                            onChange={(e: TargetedEvent<HTMLTextAreaElement, Event>) => {
                                setTokenIds(e.currentTarget.value);
                            }}
                            placeholder="47, 6, 48, 6, 49, 6, 50, 6, 51, 6, 52, 6, 22, 6, 53, 6, 54, 6, 30, 6, 55, 6, 56, 6, 34, 6, 57, 6, 58, 15, 6, 59, 6, 60, 6, 61, 6, 62, 6, 30, 6, 63, 6, 64, 6, 53, 6, 65, 6, 66, 6, 67, 15"
                            className="h-full font-mono text-sm resize-none"
                        />
                    )}
                </CardContent>
            </Card>

        </>)
    });