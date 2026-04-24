import { BedrockRuntimeClient, ConverseCommand } from "@aws-sdk/client-bedrock-runtime";

const client = new BedrockRuntimeClient({
    region: "us-east-1",
    token: "" // Your long-term API key
});

async function testDeepSeek() {
    // MATCHING YOUR CLI OUTPUT EXACTLY:
    const modelId = "deepseek.v3.2"; 

    const command = new ConverseCommand({
        modelId: modelId,
        messages: [
            {
                role: "user",
                content: [{ text: "whats your name?" }],
            },
        ],
        inferenceConfig: {
            maxTokens: 512,
            temperature: 0.5,
        },
    });

    try {
        console.log(`Sending request to ${modelId}...`);
        const response = await client.send(command);
        
        // Output the response
        console.log("\n--- Response ---");
        console.log(response.output.message.content[0].text);

    } catch (err) {
        console.error("Error invoking DeepSeek:", err.message);
        
        // Final fallback if the above still fails
        if (err.message.includes("model identifier is invalid")) {
            console.log("\n💡 Try using the full ARN from your CLI output if 'deepseek.v3.2' fails:");
            console.log("arn:aws:bedrock:us-east-1::foundation-model/deepseek.v3.2");
        }
    }
}

testDeepSeek();
