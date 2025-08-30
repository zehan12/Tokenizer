import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { RotateCcw } from "lucide-react"
import { memo, type FC } from "preact/compat"

interface ToolbarProps {
    mode: "encode" | "decode";
    handleModeSwitch: (mode: "encode" | "decode") => void;
    handlePredefinedTextSelect: (item: string) => void;
    showWhitespace: boolean;
    setShowWhitespace: (checked: boolean) => void;
    reset: () => void;
}

export const Toolbar: FC<ToolbarProps> =
    memo(
        ({
            mode = "encode",
            handleModeSwitch,
            handlePredefinedTextSelect,
            showWhitespace,
            setShowWhitespace,
            reset }

        ) => {
            return (<>
                <div>

                    <Card className="flex-shrink-0">
                        <CardContent className="p-4">
                            <div className="flex flex-wrap gap-4 items-center">
                                <div className="flex gap-2">
                                    <Button variant={mode === "encode" ? "default" : "outline"} onClick={() => handleModeSwitch("encode")}>
                                        Encode
                                    </Button>
                                    <Button variant={mode === "decode" ? "default" : "outline"} onClick={() => handleModeSwitch("decode")}>
                                        Decode
                                    </Button>
                                </div>

                                {mode === "encode" && (
                                    <Select onValueChange={handlePredefinedTextSelect}>
                                        <SelectTrigger className="w-48">
                                            <SelectValue placeholder="Choose example text" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="simple">Simple greeting</SelectItem>
                                            <SelectItem value="greeting">Color preference</SelectItem>
                                            <SelectItem value="medium">Quick brown fox</SelectItem>
                                            <SelectItem value="complex">AI description</SelectItem>
                                            <SelectItem value="technical">React hooks</SelectItem>
                                            <SelectItem value="long">Tokenization essay</SelectItem>
                                            <SelectItem value="react">React</SelectItem>
                                        </SelectContent>
                                    </Select>
                                )}

                                <div className="flex items-center space-x-2">
                                    <Checkbox
                                        id="whitespace"
                                        checked={showWhitespace}
                                        onCheckedChange={(checked) => setShowWhitespace(checked as boolean)}
                                    />
                                    <label htmlFor="whitespace" className="text-sm">
                                        Show whitespace
                                    </label>
                                </div>

                                <Button variant="outline" size="sm" onClick={reset}>
                                    <RotateCcw className="w-4 h-4 mr-2" />
                                    Clear
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </>)
        }
    );