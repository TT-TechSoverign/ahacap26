import fs from 'fs';
import { NextResponse } from 'next/server';
import path from 'path';

export async function PATCH(request: Request) {
    try {
        const body = await request.json();
        const {
            mini_split_label,
            window_ac_label,
            mini_split_estimate_date,
            mini_split_install_date,
            window_ac_estimate_date,
            window_ac_install_date,
            general_availability_range
        } = body;

        const filePath = path.join(process.cwd(), 'lib/content/content.json');

        if (!fs.existsSync(filePath)) {
            return NextResponse.json({ error: 'Content file not found' }, { status: 404 });
        }

        const fileContent = fs.readFileSync(filePath, 'utf8');
        const content = JSON.parse(fileContent);

        // Update only the footer_schedule section
        content.footer_schedule = {
            mini_split_label,
            window_ac_label,
            mini_split_estimate_date,
            mini_split_install_date,
            window_ac_estimate_date,
            window_ac_install_date,
            general_availability_range
        };

        // Create backup
        const backupPath = `${filePath}.bak`;
        fs.copyFileSync(filePath, backupPath);

        // Save
        fs.writeFileSync(filePath, JSON.stringify(content, null, 2), 'utf8');

        return NextResponse.json({ success: true, schedule: content.footer_schedule });
    } catch (error) {
        console.error('Failed to update schedule:', error);
        return NextResponse.json({ error: 'Failed to update schedule' }, { status: 500 });
    }
}
