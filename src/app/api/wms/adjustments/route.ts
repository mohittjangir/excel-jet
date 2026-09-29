import { NextRequest, NextResponse } from 'next/server';
import { WMSDB } from '@/lib/wms-db';

export async function GET() {
  try {
    const adjustments = WMSDB.getAdjustments();
    return NextResponse.json(adjustments);
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to fetch adjustments' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const userRole = request.headers.get('x-user-role');
    const userName = request.headers.get('x-user-name') || 'Operator';

    const body = await request.json();
    if (!body.productId || !body.quantity) {
      return NextResponse.json({ error: 'Product ID and quantity are required' }, { status: 400 });
    }

    const result = WMSDB.adjustStock({
      productId: body.productId,
      type: body.type || 'CYCLE_COUNT',
      quantity: Number(body.quantity),
      reason: body.reason || 'Inventory Adjustment',
      user: userName,
      role: userRole as any,
    });

    return NextResponse.json(result, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to process adjustment' }, { status: 400 });
  }
}
