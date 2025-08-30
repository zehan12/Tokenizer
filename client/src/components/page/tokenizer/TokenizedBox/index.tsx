import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Copy } from "lucide-react";
import { memo } from "preact/compat";

interface TokenizedBoxProps {
    mode: "encode" | "decode";
    encodedTokens?: Array<{ token: string; id: number }>;
    decodedText?: string;
    encodeView: "text" | "tokenIds";
    setEncodeView: (view: "text" | "tokenIds") => void;
    showWhitespace: boolean; 
    copyToClipboard: (text: string) => void;
}

export const TokenizedBox = memo(
    ({
        mode,
        encodedTokens = [],
        decodedText = "",
        encodeView,
        setEncodeView,
        showWhitespace,
        copyToClipboard,
    }: TokenizedBoxProps) => {
        const getTokenColor = (index: number) => {
            const colors = [
                "bg-purple-200 text-purple-800",
                "bg-green-200 text-green-800",
                "bg-orange-200 text-orange-800",
                "bg-pink-200 text-pink-800",
                "bg-blue-200 text-blue-800",
                "bg-cyan-200 text-cyan-800",
                "bg-yellow-200 text-yellow-800",
                "bg-red-200 text-red-800",
            ];
            return colors[index % colors.length];
        };

        return (
            <Card className="flex flex-col h-full">
                <CardHeader className="flex-shrink-0">
                    <CardTitle className="flex items-center justify-between">
                        {mode === "encode" ? "Tokenized Text" : "Decoded Text"}
                        {mode === "encode" && (
                            <span className="text-sm text-muted-foreground">
                                Token count: {encodedTokens.length}
                            </span>
                        )}
                    </CardTitle>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col">
                    <div className="h-full flex flex-col space-y-4">
                        {mode === "encode" ? (
                            <div className="flex-1 overflow-auto">
                                <div className="space-y-4">
                                    {/* View Toggle */}
                                    <div className="flex gap-1 bg-gray-100 p-1 rounded-lg w-fit">
                                        <Button
                                            variant={encodeView === "text" ? "default" : "ghost"}
                                            size="sm"
                                            onClick={() => setEncodeView("text")}
                                            className={
                                                encodeView === "text"
                                                    ? "bg-green-600 hover:bg-green-700"
                                                    : ""
                                            }
                                        >
                                            Text
                                        </Button>
                                        <Button
                                            variant={encodeView === "tokenIds" ? "default" : "ghost"}
                                            size="sm"
                                            onClick={() => setEncodeView("tokenIds")}
                                            className={
                                                encodeView === "tokenIds"
                                                    ? "bg-green-600 hover:bg-green-700"
                                                    : ""
                                            }
                                        >
                                            Token IDs
                                        </Button>
                                    </div>

                                    {/* Token Display */}
                                    {encodeView === "text" ? (
                                        <div className="flex flex-wrap gap-1">
                                            {encodedTokens.map((tokenData, index) => (
                                                <span
                                                    key={index}
                                                    className={`px-2 py-1 rounded text-sm font-medium ${getTokenColor(
                                                        index
                                                    )}`}
                                                >
                                                    {showWhitespace
                                                        ? tokenData.token.replace(/ /g, "·")
                                                        : tokenData.token}
                                                </span>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="bg-gray-50 p-4 rounded-lg font-mono text-sm">
                                            [{encodedTokens.map((t) => t.id).join(", ")}]
                                        </div>
                                    )}
                                </div>
                            </div>
                        ) : (
                            <div className="flex-1 flex flex-col space-y-2">
                                <div className="bg-muted p-4 rounded-lg font-mono text-sm flex-1 whitespace-pre-wrap overflow-auto">
                                    {decodedText || "Enter token IDs to decode..."}
                                </div>
                                {decodedText && (
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => copyToClipboard(decodedText)}
                                        className="flex-shrink-0"
                                    >
                                        <Copy className="w-4 h-4 mr-2" />
                                        Copy Decoded Text
                                    </Button>
                                )}
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>
        );
    }
);

