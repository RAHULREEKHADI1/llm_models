def get_model_comparison():
    return [
        {
            "model_type": "open_source",
            "cost": "Free (infrastructure cost only)",
            "latency": "Depends on your hardware",
            "control": "Full control over weights and inference",
            "privacy": "Data never leaves your system",
            "customization": "Fine-tuning, LoRA, full retraining",
            "best_for": [
                "Research",
                "On-prem deployment",
                "Privacy-critical apps",
                "Custom fine-tuning"
            ],
            "risks": [
                "Requires ML expertise",
                "Hardware costs",
                "Model quality varies"
            ]
        },
        {
            "model_type": "closed_source",
            "cost": "Pay per token / subscription",
            "latency": "Optimized and low",
            "control": "No access to internals",
            "privacy": "Data sent to provider",
            "customization": "Prompt-only tuning",
            "best_for": [
                "Rapid prototyping",
                "Enterprise chatbots",
                "Low ML overhead"
            ],
            "risks": [
                "Vendor lock-in",
                "Data privacy concerns",
                "Unpredictable pricing"
            ]
        }
    ]
