"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white flex flex-col items-center">
      {/* Hero Section */}
      <section className="text-center mt-20 px-6">
        <span className="text-sm bg-purple-900/30 text-purple-400 px-3 py-1 rounded-full">
          Smarter Answers, Instantly
        </span>
        <h1 className="text-5xl font-extrabold mt-6 leading-tight">
          Welcome to <span className="text-purple-400">Intellio</span>
        </h1>
        <p className="text-gray-400 mt-6 text-lg max-w-2xl mx-auto">
          Intellio is your intelligent AI assistant that solves queries in
          real-time. Whether it’s code, knowledge, or creative brainstorming—
          Intellio delivers fast, accurate, and reliable solutions.
        </p>
      </section>

      {/* Features Section */}
      <section className="grid md:grid-cols-2 gap-6 mt-16 max-w-4xl px-6">
        {/* Card 1: Ask a Question */}
        <Card className="rounded-2xl shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40 bg-gray-800/70 border border-gray-700 transition">
          <CardContent className="p-8 text-center">
            <div className="text-4xl text-purple-400">🤖</div>
            <h3 className="text-xl font-semibold mt-4">Ask Anything</h3>
            <p className="text-gray-400 mt-2">
              Get instant AI-powered answers to your queries. From coding help
              to knowledge and ideas—Intellio has you covered.
            </p>

            <Link href={session ? "/ai-tool" : "/login"} passHref>
              <Button
                variant="default"
                className="mt-4 bg-purple-500 hover:bg-purple-600 text-white"
              >
                Start Asking →
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Card 2: Sign Up */}
        <Card className="rounded-2xl shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40 bg-gray-800/70 border border-gray-700 transition">
          <CardContent className="p-8 text-center">
            <div className="text-4xl text-purple-400">🚀</div>
            <h3 className="text-xl font-semibold mt-4">Join Intellio</h3>
            <p className="text-gray-400 mt-2">
              Unlock the full power of AI assistance. Create your account to
              save queries, explore personalized insights, and stay ahead with
              Intellio.
            </p>
            <Link href="/register" passHref>
              <Button
                variant="default"
                className="mt-4 bg-purple-500 hover:bg-purple-600 text-white"
              >
                Sign Up →
              </Button>
            </Link>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
