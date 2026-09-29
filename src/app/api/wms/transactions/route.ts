import { NextRequest, NextResponse } from 'next/server';
import { WMSDB } from '@/lib/wms-db';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search') || undefined;
    const type = searchParams.get('type') || undefined;

    const transactions = WMSDB.getTransactions({ search, type });
    return NextResponse.json(transactions);
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to fetch transactions' }, { status: 500 });
  }
}
