import { Link } from "react-router-dom"
import { ArrowRight, Sparkles, LogIn, CheckCircle2, BarChart3, Shield } from "lucide-react"
import { useEffect, useState } from "react"
import {supabase} from "../client"

export default function HomePage(){
    const [isSignedIn, setIsSignedIn] = useState<boolean>(false)
    
    useEffect(() => {
        const checkUser = async () => {
            const { data: { user } } = await supabase.auth.getUser()
            if (user) {
                setIsSignedIn(true)
            } else {
                setIsSignedIn(false)
            }
        }
        checkUser()
    },[])
    
    return(
        <div className="flex h-screen w-full bg-[oklch(15.5%_0_0)] text-white overflow-hidden">
            
            <div className="flex flex-col flex-1 w-full h-full overflow-y-auto overflow-x-hidden relative scroll-smooth">
                
                <main className="flex-1 flex flex-col items-center justify-center p-8 z-10 min-h-[90vh]">
                    <div className="max-w-2xl w-full space-y-8 text-center animate-in fade-in zoom-in duration-500">
                        <div className="space-y-4 px-4 sm:px-0">
                            <h1 className="text-5xl sm:text-6xl md:text-8xl font-bold tracking-tighter text-transparent bg-clip-text bg-linear-to-br from-white to-zinc-500">
                                <span className = 'text-amber-700'>H</span>
                                    ustly.
                            </h1>
                            <p className="text-lg sm:text-xl md:text-2xl text-zinc-400 font-light tracking-wide">
                                Your personal workspace for getting things done.
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8 w-full sm:w-auto px-4">
                            <Link 
                                to={isSignedIn ? "/my-hustles" : "/signup"} 
                                className="group flex items-center justify-center gap-2 px-8 py-4 bg-zinc-100 text-black rounded-full font-medium transition-all hover:bg-white hover:scale-105 w-full sm:w-auto"
                            >
                                <Sparkles className="w-5 h-5" />
                                <span>Get Started</span>
                                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                            </Link>

                            <Link 
                                to="/signin" 
                                className="group flex items-center justify-center gap-2 px-8 py-4 bg-zinc-900 border border-zinc-800 text-zinc-300 rounded-full font-medium transition-all hover:bg-zinc-800 hover:text-white w-full sm:w-auto"
                            >
                                <LogIn className="w-5 h-5" />
                                <span>Sign In</span>
                            </Link>
                        </div>
                    </div>
                </main>

                {/* Info Section for Visitors */}
                <section className="w-full bg-[oklch(15.5%_0_0)] py-24 px-8">
                    <div className="max-w-6xl mx-auto space-y-16">
                        <div className="text-center space-y-4">
                            <h2 className="text-3xl md:text-4xl font-bold">Why Hustly?</h2>
                            <p className="text-zinc-400 max-w-2xl mx-auto">
                                We built Hustly for makers, learners, and doers who need a clean space to track their personal projects without the clutter of complex management tools.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                            <div className="p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800 hover:border-amber-500/30 transition-colors">
                                <div className="h-12 w-12 rounded-lg bg-amber-500/10 flex items-center justify-center mb-4">
                                    <CheckCircle2 className="w-6 h-6 text-amber-500" />
                                </div>
                                <h3 className="text-xl font-semibold mb-2">Track & Complete</h3>
                                <p className="text-zinc-400 text-sm leading-relaxed">
                                    Break your hustles down into manageable statuses. Move from "Active" to "Completed" and build your streak.
                                </p>
                            </div>

                            <div className="p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800 hover:border-emerald-500/30 transition-colors">
                                <div className="h-12 w-12 rounded-lg bg-emerald-500/10 flex items-center justify-center mb-4">
                                    <BarChart3 className="w-6 h-6 text-emerald-500" />
                                </div>
                                <h3 className="text-xl font-semibold mb-2">Visualize Growth</h3>
                                <p className="text-zinc-400 text-sm leading-relaxed">
                                    Watch your progress with beautiful interactive charts. See your daily activity and monthly breakdowns at a glance.
                                </p>
                            </div>

                            <div className="p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800 hover:border-blue-500/30 transition-colors">
                                <div className="h-12 w-12 rounded-lg bg-blue-500/10 flex items-center justify-center mb-4">
                                    <Shield className="w-6 h-6 text-blue-500" />
                                </div>
                                <h3 className="text-xl font-semibold mb-2">Focus First</h3>
                                <p className="text-zinc-400 text-sm leading-relaxed">
                                    A distraction-free dark interface designed to help you enter the flow state and focus purely on your work.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* How it works / Stats Section */}
                <section className="w-full py-24 px-8 bg-[oklch(15.5%_0_0)]">
                    <div className="max-w-4xl mx-auto text-center space-y-16">
                         <h2 className="text-3xl font-bold tracking-tight">Built for Progress</h2>
                         <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                            <div className="space-y-2">
                                <div className="text-4xl font-bold text-amber-500">100%</div>
                                <div className="text-sm text-zinc-500 font-medium uppercase tracking-wider">Focus</div>
                            </div>
                            <div className="space-y-2">
                                <div className="text-4xl font-bold text-emerald-500">Zero</div>
                                <div className="text-sm text-zinc-500 font-medium uppercase tracking-wider">Distractions</div>
                            </div>
                            <div className="space-y-2">
                                <div className="text-4xl font-bold text-blue-500">Free</div>
                                <div className="text-sm text-zinc-500 font-medium uppercase tracking-wider">Forever</div>
                            </div>
                            <div className="space-y-2">
                                <div className="text-4xl font-bold text-purple-500">Secure</div>
                                <div className="text-sm text-zinc-500 font-medium uppercase tracking-wider">By Default</div>
                            </div>
                         </div>
                    </div>
                </section>

                <footer className="w-full py-8 text-center text-zinc-600 text-sm border-t border-zinc-800/50 bg-[oklch(15.5%_0_0)]">
                    <p>&copy; {new Date().getFullYear()} Hustly. Crafted for builders.</p>
                </footer>
                
                {/* Subtle Background Element */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
            </div>
        </div>
    )
}