import { Builder } from '@builder.io/react';
import { Button } from '@/components/ui/Button';

// Register specific components to be used in the Visual Editor
export function registerComponents() {
    Builder.registerComponent(Button, {
        name: 'Sovereign Button',
        inputs: [
            {
                name: 'children',
                type: 'string',
                defaultValue: 'Click me',
            },
            {
                name: 'variant',
                type: 'string',
                enum: ['default', 'outline', 'ghost', 'link'],
                defaultValue: 'default',
            },
            {
                name: 'className',
                type: 'string',
                defaultValue: '',
            },
        ],
    });

    // Example of a custom registered component (placeholder for 'IndustrialCard')
    // You can import your actual IndustrialCard here once located
}
