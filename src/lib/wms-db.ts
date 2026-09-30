import fs from 'fs';
import path from 'path';

export interface Product {
  id: string;
  sku: string;
  name: string;
  category: string;
  unit?: string;
  warehouse?: string;
  quantity: number;
  minStock: number;
  status: 'In Stock' | 'Low Stock' | 'Out of Stock';
  price: number;
  location: string;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  code: string;
  name: string;
  description: string;
  createdAt: string;
}

export interface Unit {
  id: string;
  code: string;
  name: string;
  symbol: string;
  createdAt: string;
}

export interface Warehouse {
  id: string;
  code: string;
  name: string;
  address: string;
  manager: string;
  status: 'ACTIVE' | 'INACTIVE';
  createdAt: string;
}

export interface Location {
  id: string;
  warehouseName: string;
  zone: string;
  aisle: string;
  bin: string;
  code: string;
  status: 'ACTIVE' | 'FULL' | 'MAINTENANCE';
  createdAt: string;
}

export interface Supplier {
  id: string;
  code: string;
  name: string;
  contactPerson: string;
  email: string;
  phone: string;
  address: string;
  status: 'ACTIVE' | 'INACTIVE';
  createdAt: string;
}

export interface Customer {
  id: string;
  code: string;
  name: string;
  contactPerson: string;
  email: string;
  phone: string;
  address: string;
  status: 'ACTIVE' | 'INACTIVE';
  createdAt: string;
}

export interface StockTransaction {
  id: string;
  productId: string;
  productName: string;
  sku: string;
  type: 'STOCK_IN' | 'STOCK_OUT' | 'ADJUSTMENT';
  quantity: number;
  sourceDestination: string;
  referenceNo: string;
  notes: string;
  user: string;
  createdAt: string;
}

export interface StockAdjustment {
  id: string;
  productId: string;
  productName: string;
  sku: string;
  type: 'INCREMENT' | 'DECREMENT' | 'DAMAGE_WRITE_OFF' | 'CYCLE_COUNT';
  quantity: number;
  oldQuantity: number;
  newQuantity: number;
  reason: string;
  user: string;
  createdAt: string;
}

export interface AuditLog {
  id: string;
  user: string;
  role: 'ADMIN' | 'STAFF';
  action: string;
  category: 'INVENTORY' | 'MASTER' | 'USER' | 'SYSTEM';
  details: string;
  createdAt: string;
}

export interface WMSUser {
  id: string;
  name: string;
  email: string;
  role: 'ADMIN' | 'STAFF';
  status: 'ACTIVE' | 'DISABLED';
  createdAt: string;
}

export interface Carton {
  id: string;
  cartonCode: string;
  productName: string;
  quantity: number;
  supplier: string;
  status: string;
  notes: string;
  createdAt: string;
}

interface WMSStoreData {
  products: Product[];
  categories: Category[];
  units: Unit[];
  warehouses: Warehouse[];
  locations: Location[];
  suppliers: Supplier[];
  customers: Customer[];
  transactions: StockTransaction[];
  adjustments: StockAdjustment[];
  auditLogs: AuditLog[];
  users: WMSUser[];
  cartons: Carton[];
}

const DB_FILE = path.join(process.cwd(), 'src', 'db', 'wms-store.json');

const INITIAL_DATA: WMSStoreData = {
  categories: [
    { id: "cat-1", code: "CAT-STR", name: "Storage & Racking", description: "Industrial pallets and racking frames", createdAt: new Date().toISOString() },
    { id: "cat-2", code: "CAT-[#0077C8]", name: "Packaging Materials", description: "Corrugated boxes and protective film", createdAt: new Date().toISOString() },
    { id: "cat-3", code: "CAT-HW", name: "Hardware & Electronics", description: "Scanners, terminals & IoT sensors", createdAt: new Date().toISOString() },
    { id: "cat-4", code: "CAT-LBL", name: "Labeling & Tags", description: "Thermal roll labels and bin tags", createdAt: new Date().toISOString() },
  ],
  units: [
    { id: "unit-1", code: "UNT-PCS", name: "Pieces", symbol: "pcs", createdAt: new Date().toISOString() },
    { id: "unit-2", code: "UNT-CTN", name: "Cartons / Boxes", symbol: "ctn", createdAt: new Date().toISOString() },
    { id: "unit-3", code: "UNT-PAL", name: "Pallets", symbol: "pal", createdAt: new Date().toISOString() },
    { id: "unit-4", code: "UNT-KG", name: "Kilograms", symbol: "kg", createdAt: new Date().toISOString() },
  ],
  warehouses: [
    { id: "wh-1", code: "WH-CENTRAL", name: "Central Metro Distribution Hub", address: "Building A, Logistics Park, Metro City", manager: "Admin Manager", status: "ACTIVE", createdAt: new Date().toISOString() },
    { id: "wh-2", code: "WH-NORTH", name: "North Regional Logistics Facility", address: "North Express Highway, Gate 4", manager: "Rahul Sharma", status: "ACTIVE", createdAt: new Date().toISOString() },
  ],
  locations: [
    { id: "loc-1", warehouseName: "Central Metro Distribution Hub", zone: "Zone A", aisle: "02", bin: "B-12", code: "ZA-A02-B12", status: "ACTIVE", createdAt: new Date().toISOString() },
    { id: "loc-2", warehouseName: "Central Metro Distribution Hub", zone: "Zone B", aisle: "04", bin: "C-08", code: "ZB-A04-C08", status: "ACTIVE", createdAt: new Date().toISOString() },
    { id: "loc-3", warehouseName: "North Regional Logistics Facility", zone: "Zone C", aisle: "01", bin: "A-01", code: "ZC-A01-A01", status: "ACTIVE", createdAt: new Date().toISOString() },
  ],
  suppliers: [
    { id: "sup-1", code: "SUP-8801", name: "Apex Industrial Supplies Ltd", contactPerson: "John Reynolds", email: "orders@apexindustrial.com", phone: "+1 800 555 0199", address: "100 Logistics Way, Industrial Zone", status: "ACTIVE", createdAt: new Date().toISOString() },
    { id: "sup-2", code: "SUP-9942", name: "Global Packaging Materials Corp", contactPerson: "Elena Rostova", email: "sales@globalpack.com", phone: "+1 800 555 0244", address: "450 Packaging Blvd, Freight City", status: "ACTIVE", createdAt: new Date().toISOString() },
  ],
  customers: [
    { id: "cust-1", code: "CUST-104", name: "Metro Retail Fulfillment Network", contactPerson: "Sarah Jenkins", email: "receiving@metroretail.com", phone: "+1 800 555 0311", address: "78 Commerce St, Distribution Park", status: "ACTIVE", createdAt: new Date().toISOString() },
    { id: "cust-2", code: "CUST-208", name: "OmniChannel Logistics Group", contactPerson: "Marcus Vance", email: "dispatch@omnichannel.com", phone: "+1 800 555 0422", address: "12 Logistics Pkwy, Suite 400", status: "ACTIVE", createdAt: new Date().toISOString() },
  ],
  products: [
    {
      id: "prod-1",
      sku: "SKU-PAL-9042",
      name: "Industrial Steel Pallet Racks",
      category: "Storage & Racking",
      unit: "Pallets",
      warehouse: "Central Metro Distribution Hub",
      quantity: 148,
      minStock: 20,
      status: "In Stock",
      price: 250,
      location: "Zone A - Aisle 02",
      createdAt: new Date(Date.now() - 86400000 * 10).toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "prod-2",
      sku: "SKU-[#0077C8]-BOX",
      name: "Heavy-Duty Corrugated Cartons",
      category: "Packaging Materials",
      unit: "Cartons / Boxes",
      warehouse: "Central Metro Distribution Hub",
      quantity: 12,
      minStock: 25,
      status: "Low Stock",
      price: 15,
      location: "Zone B - Aisle 04",
      createdAt: new Date(Date.now() - 86400000 * 8).toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "prod-3",
      sku: "SKU-SCN-7701",
      name: "Wireless Handheld Barcode Scanners",
      category: "Hardware & Electronics",
      unit: "Pieces",
      warehouse: "North Regional Logistics Facility",
      quantity: 0,
      minStock: 5,
      status: "Out of Stock",
      price: 320,
      location: "Zone C - Cabinet 01",
      createdAt: new Date(Date.now() - 86400000 * 15).toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "prod-4",
      sku: "SKU-[#16A34A]-LBL",
      name: "Thermal Transfer SKU Labels (Roll of 1000)",
      category: "Labeling & Tags",
      unit: "Pieces",
      warehouse: "Central Metro Distribution Hub",
      quantity: 350,
      minStock: 50,
      status: "In Stock",
      price: 45,
      location: "Zone D - Shelf 08",
      createdAt: new Date(Date.now() - 86400000 * 5).toISOString(),
      updatedAt: new Date().toISOString(),
    }
  ],
  transactions: [
    {
      id: "tx-1001",
      productId: "prod-1",
      productName: "Industrial Steel Pallet Racks",
      sku: "SKU-PAL-9042",
      type: "STOCK_IN",
      quantity: 50,
      sourceDestination: "Apex Industrial Supplies Ltd",
      referenceNo: "PO-99401",
      notes: "Inbound receiving verified at Gate 2",
      user: "Admin Manager",
      createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
    },
    {
      id: "tx-1002",
      productId: "prod-2",
      productName: "Heavy-Duty Corrugated Cartons",
      sku: "SKU-[#0077C8]-BOX",
      type: "STOCK_OUT",
      quantity: 30,
      sourceDestination: "Metro Retail Fulfillment Network",
      referenceNo: "ORD-44021",
      notes: "Outbound customer dispatch verified",
      user: "Rahul Sharma",
      createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
    }
  ],
  adjustments: [
    {
      id: "adj-1",
      productId: "prod-2",
      productName: "Heavy-Duty Corrugated Cartons",
      sku: "SKU-[#0077C8]-BOX",
      type: "DAMAGE_WRITE_OFF",
      quantity: 5,
      oldQuantity: 17,
      newQuantity: 12,
      reason: "Water damage during transit",
      user: "Admin Manager",
      createdAt: new Date(Date.now() - 86400000).toISOString(),
    }
  ],
  auditLogs: [
    {
      id: "log-1",
      user: "Admin Manager",
      role: "ADMIN",
      action: "STOCK_IN_PROCESSED",
      category: "INVENTORY",
      details: "Received 50 units of Industrial Steel Pallet Racks (SKU-PAL-9042)",
      createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
    },
    {
      id: "log-2",
      user: "Rahul Sharma",
      role: "STAFF",
      action: "STOCK_OUT_PROCESSED",
      category: "INVENTORY",
      details: "Dispatched 30 units of Heavy-Duty Corrugated Cartons (SKU-[#0077C8]-BOX)",
      createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
    }
  ],
  users: [
    { id: "u-admin", name: "Admin Manager", email: "admin@warehouse.com", role: "ADMIN", status: "ACTIVE", createdAt: new Date(Date.now() - 86400000 * 30).toISOString() },
    { id: "u-staff", name: "Rahul Sharma", email: "rahul@warehouse.com", role: "STAFF", status: "ACTIVE", createdAt: new Date(Date.now() - 86400000 * 20).toISOString() },
  ],
  cartons: [
    { id: "ctn-1", cartonCode: "CTN-9021", productName: "Industrial Steel Pallet Racks", quantity: 50, supplier: "Apex Industrial Supplies Ltd", status: "In Storage", notes: "Standard pallet box", createdAt: new Date().toISOString() }
  ]
};

function readStore(): WMSStoreData {
  try {
    if (!fs.existsSync(DB_FILE)) {
      const dir = path.dirname(DB_FILE);
      if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
      fs.writeFileSync(DB_FILE, JSON.stringify(INITIAL_DATA, null, 2), 'utf-8');
      return INITIAL_DATA;
    }
    const raw = fs.readFileSync(DB_FILE, 'utf-8');
    const parsed = JSON.parse(raw);
    return {
      categories: parsed.categories || INITIAL_DATA.categories,
      units: parsed.units || INITIAL_DATA.units,
      warehouses: parsed.warehouses || INITIAL_DATA.warehouses,
      locations: parsed.locations || INITIAL_DATA.locations,
      suppliers: parsed.suppliers || INITIAL_DATA.suppliers,
      customers: parsed.customers || INITIAL_DATA.customers,
      products: parsed.products || INITIAL_DATA.products,
      transactions: parsed.transactions || INITIAL_DATA.transactions,
      adjustments: parsed.adjustments || INITIAL_DATA.adjustments,
      auditLogs: parsed.auditLogs || INITIAL_DATA.auditLogs,
      users: parsed.users || INITIAL_DATA.users,
      cartons: parsed.cartons || INITIAL_DATA.cartons || [],
    };
  } catch (error) {
    console.error("Failed to read WMS DB, reverting to initial dataset:", error);
    return INITIAL_DATA;
  }
}

function writeStore(data: WMSStoreData): boolean {
  try {
    const dir = path.dirname(DB_FILE);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch (error) {
    console.error("Failed to write to WMS DB:", error);
    return false;
  }
}

function calculateStatus(quantity: number, minStock: number): 'In Stock' | 'Low Stock' | 'Out of Stock' {
  if (quantity <= 0) return 'Out of Stock';
  if (quantity <= minStock) return 'Low Stock';
  return 'In Stock';
}

function addAudit(store: WMSStoreData, user: string, role: 'ADMIN' | 'STAFF', action: string, category: 'INVENTORY' | 'MASTER' | 'USER' | 'SYSTEM', details: string) {
  const newLog: AuditLog = {
    id: `log-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    user: user || 'System',
    role: role || 'STAFF',
    action,
    category,
    details,
    createdAt: new Date().toISOString(),
  };
  store.auditLogs.unshift(newLog);
}

export const WMSDB = {
  // PRODUCTS
  getProducts(filter?: { search?: string; category?: string; status?: string; sortBy?: string; order?: 'asc' | 'desc' }): Product[] {
    const data = readStore();
    let result = [...data.products];
    if (filter?.search) {
      const q = filter.search.toLowerCase();
      result = result.filter(p => p.name.toLowerCase().includes(q) || p.sku.toLowerCase().includes(q) || p.location.toLowerCase().includes(q));
    }
    if (filter?.category && filter.category !== 'All') {
      result = result.filter(p => p.category === filter.category);
    }
    if (filter?.status && filter.status !== 'All') {
      result = result.filter(p => p.status === filter.status);
    }
    return result;
  },

  addProduct(productData: Omit<Product, 'id' | 'status' | 'createdAt' | 'updatedAt'>, user?: string, role?: 'ADMIN' | 'STAFF'): Product {
    const data = readStore();
    const newProduct: Product = {
      id: `prod-${Date.now()}`,
      sku: productData.sku || `SKU-${Date.now().toString().slice(-6)}`,
      name: productData.name,
      category: productData.category || 'General',
      unit: productData.unit || 'Pieces',
      warehouse: productData.warehouse || 'Central Metro Distribution Hub',
      quantity: Math.max(0, productData.quantity || 0),
      minStock: Math.max(1, productData.minStock || 10),
      status: calculateStatus(productData.quantity || 0, productData.minStock || 10),
      price: Math.max(0, productData.price || 0),
      location: productData.location || 'Main Storage',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    data.products.unshift(newProduct);
    addAudit(data, user || 'Admin Manager', role || 'ADMIN', 'PRODUCT_CREATED', 'MASTER', `Created product SKU: ${newProduct.sku} (${newProduct.name})`);
    writeStore(data);
    return newProduct;
  },

  updateProduct(id: string, productData: Partial<Product>, user?: string, role?: 'ADMIN' | 'STAFF'): Product {
    const data = readStore();
    const index = data.products.findIndex(p => p.id === id);
    if (index === -1) throw new Error("Product not found");

    const existing = data.products[index];
    const updatedQty = productData.quantity !== undefined ? Math.max(0, productData.quantity) : existing.quantity;
    const updatedMin = productData.minStock !== undefined ? Math.max(1, productData.minStock) : existing.minStock;

    const updated: Product = {
      ...existing,
      ...productData,
      quantity: updatedQty,
      minStock: updatedMin,
      status: calculateStatus(updatedQty, updatedMin),
      updatedAt: new Date().toISOString(),
    };

    data.products[index] = updated;
    addAudit(data, user || 'Admin Manager', role || 'ADMIN', 'PRODUCT_UPDATED', 'MASTER', `Updated product details for ${updated.sku}`);
    writeStore(data);
    return updated;
  },

  deleteProduct(id: string, user?: string, role?: 'ADMIN' | 'STAFF'): boolean {
    const data = readStore();
    const target = data.products.find(p => p.id === id);
    if (!target) return false;

    data.products = data.products.filter(p => p.id !== id);
    addAudit(data, user || 'Admin Manager', role || 'ADMIN', 'PRODUCT_DELETED', 'MASTER', `Deleted SKU: ${target.sku} (${target.name})`);
    return writeStore(data);
  },

  // STOCK IN / RECEIVING
  stockIn(params: { productId: string; quantity: number; sourceDestination?: string; referenceNo?: string; notes?: string; user?: string; role?: 'ADMIN' | 'STAFF'; warehouse?: string; location?: string; unitPrice?: number }) {
    const data = readStore();
    const product = data.products.find(p => p.id === params.productId);
    if (!product) throw new Error("Product not found");

    product.quantity += params.quantity;
    if (params.warehouse) product.warehouse = params.warehouse;
    if (params.location) product.location = params.location;
    if (params.unitPrice !== undefined && params.unitPrice >= 0) product.price = params.unitPrice;
    product.status = calculateStatus(product.quantity, product.minStock);
    product.updatedAt = new Date().toISOString();

    const locationDetails = [params.warehouse, params.location].filter(Boolean).join(' - ');
    const notesWithDetails = [params.notes, locationDetails ? `Loc: ${locationDetails}` : '', params.unitPrice !== undefined ? `Unit Cost: $${params.unitPrice}` : ''].filter(Boolean).join(' | ');

    const tx: StockTransaction = {
      id: `tx-${Date.now()}`,
      productId: product.id,
      productName: product.name,
      sku: product.sku,
      type: 'STOCK_IN',
      quantity: params.quantity,
      sourceDestination: params.sourceDestination || 'Supplier Receiving',
      referenceNo: params.referenceNo || `PO-${Date.now().toString().slice(-6)}`,
      notes: notesWithDetails || 'Inbound stock received',
      user: params.user || 'Operator',
      createdAt: new Date().toISOString(),
    };

    data.transactions.unshift(tx);
    addAudit(data, params.user || 'Operator', params.role || 'STAFF', 'STOCK_IN_PROCESSED', 'INVENTORY', `Received +${params.quantity} units for SKU: ${product.sku} (Location: ${product.location || 'Default'}, Price: $${product.price})`);
    writeStore(data);
    return { product, transaction: tx };
  },

  // STOCK OUT / DISPATCH
  stockOut(params: { productId: string; quantity: number; sourceDestination?: string; referenceNo?: string; notes?: string; user?: string; role?: 'ADMIN' | 'STAFF' }) {
    const data = readStore();
    const product = data.products.find(p => p.id === params.productId);
    if (!product) throw new Error("Product not found");

    if (params.quantity > product.quantity) {
      throw new Error(`Insufficient Stock: Cannot dispatch ${params.quantity} units. Only ${product.quantity} available.`);
    }

    product.quantity -= params.quantity;
    product.status = calculateStatus(product.quantity, product.minStock);
    product.updatedAt = new Date().toISOString();

    const tx: StockTransaction = {
      id: `tx-${Date.now()}`,
      productId: product.id,
      productName: product.name,
      sku: product.sku,
      type: 'STOCK_OUT',
      quantity: params.quantity,
      sourceDestination: params.sourceDestination || 'Customer Dispatch',
      referenceNo: params.referenceNo || `ORD-${Date.now().toString().slice(-6)}`,
      notes: params.notes || 'Outbound stock dispatched',
      user: params.user || 'Operator',
      createdAt: new Date().toISOString(),
    };

    data.transactions.unshift(tx);
    addAudit(data, params.user || 'Operator', params.role || 'STAFF', 'STOCK_OUT_PROCESSED', 'INVENTORY', `Dispatched -${params.quantity} units for SKU: ${product.sku}`);
    writeStore(data);
    return { product, transaction: tx };
  },

  getTransactions(filter?: { search?: string; type?: string }): StockTransaction[] {
    const data = readStore();
    let txs = data.transactions;
    if (filter?.type) {
      txs = txs.filter(t => t.type === filter.type);
    }
    if (filter?.search) {
      const q = filter.search.toLowerCase();
      txs = txs.filter(t => t.sku.toLowerCase().includes(q) || t.productName.toLowerCase().includes(q) || t.sourceDestination.toLowerCase().includes(q));
    }
    return txs;
  },

  // STOCK ADJUSTMENTS
  adjustStock(params: { productId: string; type: 'INCREMENT' | 'DECREMENT' | 'DAMAGE_WRITE_OFF' | 'CYCLE_COUNT'; quantity: number; reason: string; user?: string; role?: 'ADMIN' | 'STAFF' }) {
    const data = readStore();
    const product = data.products.find(p => p.id === params.productId);
    if (!product) throw new Error("Product not found");

    const oldQuantity = product.quantity;
    let newQuantity = oldQuantity;

    if (params.type === 'INCREMENT') {
      newQuantity += params.quantity;
    } else {
      if (params.quantity > oldQuantity) {
        throw new Error(`Invalid Adjustment: Adjustment quantity ${params.quantity} exceeds current available stock ${oldQuantity}`);
      }
      newQuantity -= params.quantity;
    }

    product.quantity = newQuantity;
    product.status = calculateStatus(product.quantity, product.minStock);
    product.updatedAt = new Date().toISOString();

    const adj: StockAdjustment = {
      id: `adj-${Date.now()}`,
      productId: product.id,
      productName: product.name,
      sku: product.sku,
      type: params.type,
      quantity: params.quantity,
      oldQuantity,
      newQuantity,
      reason: params.reason || 'Inventory Audit Adjustment',
      user: params.user || 'Admin Manager',
      createdAt: new Date().toISOString(),
    };

    data.adjustments.unshift(adj);
    addAudit(data, params.user || 'Admin Manager', params.role || 'ADMIN', 'STOCK_ADJUSTMENT', 'INVENTORY', `Adjusted SKU ${product.sku} (${params.type}): ${oldQuantity} -> ${newQuantity}. Reason: ${params.reason}`);
    writeStore(data);
    return { product, adjustment: adj };
  },

  getAdjustments(): StockAdjustment[] {
    return readStore().adjustments;
  },

  // MASTERS: CATEGORIES
  getCategories(): Category[] { return readStore().categories; },
  addCategory(item: Omit<Category, 'id' | 'createdAt'>, user?: string, role?: 'ADMIN' | 'STAFF'): Category {
    const data = readStore();
    const newCat: Category = { id: `cat-${Date.now()}`, code: item.code || `CAT-${Date.now().toString().slice(-4)}`, name: item.name, description: item.description || '', createdAt: new Date().toISOString() };
    data.categories.unshift(newCat);
    addAudit(data, user || 'Admin', role || 'ADMIN', 'CATEGORY_CREATED', 'MASTER', `Added category ${newCat.name}`);
    writeStore(data);
    return newCat;
  },
  deleteCategory(id: string, user?: string, role?: 'ADMIN' | 'STAFF'): boolean {
    const data = readStore();
    data.categories = data.categories.filter(c => c.id !== id);
    addAudit(data, user || 'Admin', role || 'ADMIN', 'CATEGORY_DELETED', 'MASTER', `Deleted category ID ${id}`);
    return writeStore(data);
  },

  // MASTERS: UNITS
  getUnits(): Unit[] { return readStore().units; },
  addUnit(item: Omit<Unit, 'id' | 'createdAt'>, user?: string, role?: 'ADMIN' | 'STAFF'): Unit {
    const data = readStore();
    const newUnit: Unit = { id: `unit-${Date.now()}`, code: item.code || `UNT-${Date.now().toString().slice(-4)}`, name: item.name, symbol: item.symbol || item.name.slice(0, 3), createdAt: new Date().toISOString() };
    data.units.unshift(newUnit);
    addAudit(data, user || 'Admin', role || 'ADMIN', 'UNIT_CREATED', 'MASTER', `Added unit ${newUnit.name}`);
    writeStore(data);
    return newUnit;
  },
  deleteUnit(id: string, user?: string, role?: 'ADMIN' | 'STAFF'): boolean {
    const data = readStore();
    data.units = data.units.filter(u => u.id !== id);
    addAudit(data, user || 'Admin', role || 'ADMIN', 'UNIT_DELETED', 'MASTER', `Deleted unit ID ${id}`);
    return writeStore(data);
  },

  // MASTERS: WAREHOUSES
  getWarehouses(): Warehouse[] { return readStore().warehouses; },
  addWarehouse(item: Omit<Warehouse, 'id' | 'createdAt'>, user?: string, role?: 'ADMIN' | 'STAFF'): Warehouse {
    const data = readStore();
    const newWh: Warehouse = { id: `wh-${Date.now()}`, code: item.code || `WH-${Date.now().toString().slice(-4)}`, name: item.name, address: item.address || '', manager: item.manager || 'Admin Manager', status: item.status || 'ACTIVE', createdAt: new Date().toISOString() };
    data.warehouses.unshift(newWh);
    addAudit(data, user || 'Admin', role || 'ADMIN', 'WAREHOUSE_CREATED', 'MASTER', `Added warehouse ${newWh.name}`);
    writeStore(data);
    return newWh;
  },
  deleteWarehouse(id: string, user?: string, role?: 'ADMIN' | 'STAFF'): boolean {
    const data = readStore();
    data.warehouses = data.warehouses.filter(w => w.id !== id);
    addAudit(data, user || 'Admin', role || 'ADMIN', 'WAREHOUSE_DELETED', 'MASTER', `Deleted warehouse ID ${id}`);
    return writeStore(data);
  },

  // MASTERS: LOCATIONS
  getLocations(): Location[] { return readStore().locations; },
  addLocation(item: Omit<Location, 'id' | 'createdAt'>, user?: string, role?: 'ADMIN' | 'STAFF'): Location {
    const data = readStore();
    const newLoc: Location = { id: `loc-${Date.now()}`, warehouseName: item.warehouseName || 'Central Metro Distribution Hub', zone: item.zone || 'Zone A', aisle: item.aisle || '01', bin: item.bin || 'A-01', code: item.code || `${item.zone}-${item.aisle}-${item.bin}`, status: item.status || 'ACTIVE', createdAt: new Date().toISOString() };
    data.locations.unshift(newLoc);
    addAudit(data, user || 'Admin', role || 'ADMIN', 'LOCATION_CREATED', 'MASTER', `Added location bin ${newLoc.code}`);
    writeStore(data);
    return newLoc;
  },
  deleteLocation(id: string, user?: string, role?: 'ADMIN' | 'STAFF'): boolean {
    const data = readStore();
    data.locations = data.locations.filter(l => l.id !== id);
    addAudit(data, user || 'Admin', role || 'ADMIN', 'LOCATION_DELETED', 'MASTER', `Deleted location ID ${id}`);
    return writeStore(data);
  },

  // MASTERS: SUPPLIERS
  getSuppliers(): Supplier[] { return readStore().suppliers; },
  addSupplier(item: Omit<Supplier, 'id' | 'createdAt'>, user?: string, role?: 'ADMIN' | 'STAFF'): Supplier {
    const data = readStore();
    const newSup: Supplier = { id: `sup-${Date.now()}`, code: item.code || `SUP-${Date.now().toString().slice(-4)}`, name: item.name, contactPerson: item.contactPerson || '', email: item.email || '', phone: item.phone || '', address: item.address || '', status: item.status || 'ACTIVE', createdAt: new Date().toISOString() };
    data.suppliers.unshift(newSup);
    addAudit(data, user || 'Admin', role || 'ADMIN', 'SUPPLIER_CREATED', 'MASTER', `Added supplier ${newSup.name}`);
    writeStore(data);
    return newSup;
  },
  deleteSupplier(id: string, user?: string, role?: 'ADMIN' | 'STAFF'): boolean {
    const data = readStore();
    data.suppliers = data.suppliers.filter(s => s.id !== id);
    addAudit(data, user || 'Admin', role || 'ADMIN', 'SUPPLIER_DELETED', 'MASTER', `Deleted supplier ID ${id}`);
    return writeStore(data);
  },

  // MASTERS: CUSTOMERS
  getCustomers(): Customer[] { return readStore().customers; },
  addCustomer(item: Omit<Customer, 'id' | 'createdAt'>, user?: string, role?: 'ADMIN' | 'STAFF'): Customer {
    const data = readStore();
    const newCust: Customer = { id: `cust-${Date.now()}`, code: item.code || `CUST-${Date.now().toString().slice(-4)}`, name: item.name, contactPerson: item.contactPerson || '', email: item.email || '', phone: item.phone || '', address: item.address || '', status: item.status || 'ACTIVE', createdAt: new Date().toISOString() };
    data.customers.unshift(newCust);
    addAudit(data, user || 'Admin', role || 'ADMIN', 'CUSTOMER_CREATED', 'MASTER', `Added customer ${newCust.name}`);
    writeStore(data);
    return newCust;
  },
  deleteCustomer(id: string, user?: string, role?: 'ADMIN' | 'STAFF'): boolean {
    const data = readStore();
    data.customers = data.customers.filter(c => c.id !== id);
    addAudit(data, user || 'Admin', role || 'ADMIN', 'CUSTOMER_DELETED', 'MASTER', `Deleted customer ID ${id}`);
    return writeStore(data);
  },

  // TRANSACTIONS & AUDIT LOGS
  getAuditLogs(): AuditLog[] { return readStore().auditLogs; },

  // USERS
  getUsers(): WMSUser[] { return readStore().users; },
  addUser(userData: Omit<WMSUser, 'id' | 'createdAt'>, user?: string, role?: 'ADMIN' | 'STAFF'): WMSUser {
    const data = readStore();
    const newUser: WMSUser = { id: `u-${Date.now()}`, name: userData.name, email: userData.email, role: userData.role || 'STAFF', status: userData.status || 'ACTIVE', createdAt: new Date().toISOString() };
    data.users.unshift(newUser);
    addAudit(data, user || 'Admin', role || 'ADMIN', 'USER_CREATED', 'USER', `Registered new operator: ${newUser.name} (${newUser.role})`);
    writeStore(data);
    return newUser;
  },
  updateUser(id: string, userData: Partial<WMSUser>, user?: string, role?: 'ADMIN' | 'STAFF'): WMSUser {
    const data = readStore();
    const index = data.users.findIndex(u => u.id === id);
    if (index === -1) throw new Error("User not found");
    const updated = { ...data.users[index], ...userData };
    data.users[index] = updated;
    addAudit(data, user || 'Admin', role || 'ADMIN', 'USER_UPDATED', 'USER', `Updated user role/status for ${updated.name}`);
    writeStore(data);
    return updated;
  },

  // REPORTS METRICS & AGEING
  getReports() {
    const data = readStore();
    const now = Date.now();

    const stockReport = data.products.map(p => ({
      id: p.id,
      sku: p.sku,
      name: p.name,
      category: p.category,
      quantity: p.quantity,
      price: p.price,
      totalValue: p.quantity * p.price,
      status: p.status,
    }));

    const stockAgeing = data.products.map(p => {
      const days = Math.floor((now - new Date(p.createdAt).getTime()) / (1000 * 60 * 60 * 24));
      let ageBucket: '0-30 Days' | '31-60 Days' | '61-90 Days' | '90+ Days' = '0-30 Days';
      if (days > 90) ageBucket = '90+ Days';
      else if (days > 60) ageBucket = '61-90 Days';
      else if (days > 30) ageBucket = '31-60 Days';

      return {
        id: p.id,
        sku: p.sku,
        name: p.name,
        category: p.category,
        quantity: p.quantity,
        daysInWarehouse: days,
        ageBucket,
      };
    });

    const stockMovement = data.transactions.map(t => ({
      id: t.id,
      sku: t.sku,
      productName: t.productName,
      type: t.type,
      quantity: t.quantity,
      sourceDestination: t.sourceDestination,
      user: t.user,
      createdAt: t.createdAt,
    }));

    return { stockReport, stockAgeing, stockMovement };
  },

  // STATS METRICS
  getStats() {
    const data = readStore();
    const totalProducts = data.products.length;
    const totalStock = data.products.reduce((acc, p) => acc + p.quantity, 0);
    const lowStockCount = data.products.filter(p => p.status === 'Low Stock').length;
    const outOfStockCount = data.products.filter(p => p.status === 'Out of Stock').length;

    const todayStr = new Date().toISOString().split('T')[0];
    const todayTxs = data.transactions.filter(t => t.createdAt.startsWith(todayStr));

    const stockReceived = todayTxs.filter(t => t.type === 'STOCK_IN').reduce((acc, t) => acc + t.quantity, 0);
    const stockDispatched = todayTxs.filter(t => t.type === 'STOCK_OUT').reduce((acc, t) => acc + t.quantity, 0);

    return {
      totalProducts,
      totalStock,
      stockReceived,
      stockDispatched,
      lowStockCount,
      outOfStockCount,
    };
  },

  // CARTONS
  getCartons(filter?: { search?: string }) {
    const data = readStore();
    let cartons = data.cartons || [];
    if (filter?.search) {
      const query = filter.search.toLowerCase();
      cartons = cartons.filter(c => 
        c.cartonCode.toLowerCase().includes(query) || 
        c.productName.toLowerCase().includes(query) || 
        c.supplier.toLowerCase().includes(query)
      );
    }
    return cartons;
  },

  addCarton(cartonData: Omit<Carton, 'id' | 'createdAt'>): Carton {
    const data = readStore();
    const newCarton: Carton = {
      ...cartonData,
      id: `ctn-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    if (!data.cartons) data.cartons = [];
    data.cartons.unshift(newCarton);
    writeStore(data);
    return newCarton;
  }
};
