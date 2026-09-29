import { NextResponse } from 'next/server';
import { WMSDB } from '@/lib/wms-db';

export async function GET() {
  try {
    const reports = WMSDB.getReports();
    return NextResponse.json(reports);
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to generate reports' }, { status: 500 });
  }
}
