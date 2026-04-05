const API_KEY = import.meta.env.VITE_OPENAI_API_KEY || ""; // Set VITE_OPENAI_API_KEY in .env

export const placementAiApi = {
    async askOpenAI(prompt) {
        try {
            const res = await fetch("https://api.openai.com/v1/chat/completions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${API_KEY}`
                },
                body: JSON.stringify({
                    model: "gpt-4o-mini",
                    messages: [{ role: "user", content: prompt }],
                    max_tokens: 3000
                })
            });
            const data = await res.json();
            if (data.error) throw new Error(data.error.message);
            return data.choices[0].message.content;
        } catch (error) {
            console.error("OpenAI API Error:", error);
            throw error;
        }
    },

    async getCompanySuggestions(profile) {
        const prompt = `
            Suggest 5-10 suitable companies for placement based on the following student profile:
            Course: ${profile.course || "N/A"}
            CGPA: ${profile.cgpa || "N/A"}
            Skills: ${profile.skills || "N/A"}
            Role: ${profile.role || "N/A"}
            Give only company names in a list format, no other text.
        `;
        const text = await this.askOpenAI(prompt);
        return text.split(/\n/).map(c => c.trim()).filter(c => c !== "").map(c => c.replace(/^\d+\.\s*/, ""));
    },

    async generateMockTest(section, profile, company) {
        const profileInfo = `
            Student Profile:
            Course: ${profile.course || "N/A"}
            CGPA: ${profile.cgpa || "N/A"}
            Skills: ${profile.skills || "N/A"}
            Role: ${profile.role || "N/A"}
            Company: ${company || "any company"}
        `;

        let prompt = "";
        if (section === "aptitude") {
            prompt = `${profileInfo}
                Generate exactly 10 aptitude MCQ questions ONLY from these topics:
                - Quantitative aptitude, Logical reasoning, Percentages, Ratios, Probability, Averages, Puzzles.
                STRICT RULES: No programming/technical topics. Provide ONLY MCQs in format:
                1. Question
                A. option1
                B. option2
                C. option3
                D. option4
                Answer: A/B/C/D`;
        } else if (section === "coding") {
            prompt = `${profileInfo}
                Generate EXACTLY 10 programming MCQ questions. Topics: DSA, Algorithms, Time complexity, Loops, recursion.
                Format:
                1. Question
                A. option1
                B. option2
                C. option3
                D. option4
                Answer: A/B/C/D`;
        } else if (section === "communication") {
            prompt = `${profileInfo}
                Generate EXACTLY 10 communication & soft-skills MCQ questions. Topics: Grammar, Vocabulary, sentence correction.
                Format:
                1. Question
                A. option1
                B. option2
                C. option3
                D. option4
                Answer: A/B/C/D`;
        } else if (section === "hr") {
            prompt = `Generate exactly 10 HR interview questions. RULES: Q1 must be "Tell me about yourself." Others should be standard HR round questions. No MCQs. Format: 1. Question...`;
        }

        return await this.askOpenAI(prompt);
    },

    async evaluateHrAnswer(question, answer) {
        const prompt = `
            You are acting as an HR interviewer.
            HR Question: ${question}
            Candidate Answer: ${answer}
            Give evaluation as an interviewer, return response in JSON:
            {"evaluation": "Interviewer-style short evaluation", "suggestions": ["...","...","..."]}
        `;
        const response = await this.askOpenAI(prompt);
        return JSON.parse(response.match(/\{[\s\S]*\}/)[0]);
    },

    async checkResume(resumeContent, profile) {
        const prompt = `
            You are a career coach. Evaluate this resume:
            Resume: ${resumeContent}
            Student Profile: ${JSON.stringify(profile)}
            1. Score out of 10. 2. 5 suggestions.
            Return JSON only: {"score": number, "suggestions": ["..."]}
        `;
        const response = await this.askOpenAI(prompt);
        return JSON.parse(response.match(/\{[\s\S]*\}/)[0]);
    }
};
