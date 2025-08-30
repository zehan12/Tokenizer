import { Github, Linkedin, Twitter } from "lucide-react";

export const Footer = () => {
    return (<>
        <footer className="fixed bottom-0 left-1/2 w-5xl max-w-full -translate-x-1/2 flex justify-between items-center bg-white py-2 px-4 text-center md:mt-6">
            <p className="text-sm text-slate-400">
                Built by
                <a
                    target="_blank"
                    rel="noreferrer"
                    href="https://zehankhan.vercel.app/"
                    className="text-slate-800 ml-1"
                >
                    Zehan Khan
                </a>.
            </p>
            <div className="flex items-center gap-4">
                <a
                    target="_blank"
                    rel="noreferrer"
                    href="https://github.com/zehan12/tokenizer"
                    className="text-slate-800"
                >
                    <Github />
                </a>
                <a
                    target="_blank"
                    rel="noreferrer"
                    href="https://x.com/zehan9211"
                    className="text-slate-800"
                >
                    <Twitter />
                </a>
                                <a
                    target="_blank"
                    rel="noreferrer"
                    href="https://www.linkedin.com/in/zehan-khan-6001a4144/"
                    className="text-slate-800"
                >
                    <Linkedin />
                </a>
            </div>
        </footer>
    </>)
}