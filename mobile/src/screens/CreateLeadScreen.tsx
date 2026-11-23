import React, { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SegmentedControl } from '../components/SegmentedControl';
import { MOCK_CUSTOMERS } from '../data/mockData';
import { Colors } from '../theme/colors';
import { BorderRadius, Shadows, Spacing } from '../theme/spacing';
import { Customer360, CustomerSegment, Lead, LeadPriority, LeadStatus } from '../types';

interface CreateLeadScreenProps {
  onBack: () => void;
  onSubmit: (newLead: Partial<Lead>) => void;
  onOpenCustomer360: (cif: string) => void;
  initialType?: 'new' | 'existing';
}

const AVAILABLE_PRODUCTS = [
  'Savings account',
  'Salary Account',
  'Personal Loan',
  'Overdraft Facility',
  'Debit Card',
  'World Credit Card',
  'Bancassurance General',
  'Bancassurance Life',
];

const AVAILABLE_STAFF = [
  { name: 'Branson Allann', role: 'Relationship Manager' },
  { name: 'Calendar event', role: 'Administrator' },
  { name: 'Demo Account', role: 'Sales Officer' },
  { name: 'Mutai Mutai', role: 'Account Exec' },
  { name: 'Nelly Nelly', role: 'Collections Manager' },
  { name: 'System Admin', role: 'Administrator' },
];

const BRANCHES = [
  'Courtyard Branch',
  'Griffindor',
  'Ravenclaw',
  'Nyali Branch',
];

export const CreateLeadScreen: React.FC<CreateLeadScreenProps> = ({
  onBack,
  onSubmit,
  onOpenCustomer360,
  initialType = 'new',
}) => {
  const [customerMode, setCustomerMode] = useState<string>(
    initialType === 'new' ? 'New Customer' : 'Existing Customer'
  );

  // Form Fields - New Customer
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');
  const [gpsLoading, setGpsLoading] = useState(false);

  // Form Fields - Existing Customer
  const [customerSearchQuery, setCustomerSearchQuery] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState<Customer360 | null>(null);

  // Common Categorization
  const [leadType, setLeadType] = useState('New Lead');
  const [description, setDescription] = useState('');
  const [branch, setBranch] = useState(BRANCHES[0]);

  // Commercial Details
  const [leadSource, setLeadSource] = useState('Referral');
  const [referee, setReferee] = useState('');
  const [segment, setSegment] = useState<CustomerSegment>('Retail');
  const [priority, setPriority] = useState<LeadPriority>('Medium');
  const [currency, setCurrency] = useState<'KES' | 'USD'>('KES');
  const [potentialValue, setPotentialValue] = useState('');
  const [selectedProducts, setSelectedProducts] = useState<string[]>([
    'Savings account',
  ]);

  // Assignment & Remarks
  const [initiator, setInitiator] = useState('Branson Allann');
  const [leadStatus, setLeadStatus] = useState<LeadStatus>('New');
  const [notes, setNotes] = useState('');
  const [assignedStaff, setAssignedStaff] = useState<
    { name: string; role: string }[]
  >([{ name: 'Branson Allann', role: 'Relationship Manager' }]);

  // GPS Simulation
  const handleUseGps = () => {
    setGpsLoading(true);
    setTimeout(() => {
      setLocation('Chișinău, Moldova • Lat: 47.0105, Lon: 28.8638');
      setGpsLoading(false);
    }, 600);
  };

  // Product Selection Handlers
  const handleToggleProduct = (product: string) => {
    if (selectedProducts.includes(product)) {
      setSelectedProducts(selectedProducts.filter((p) => p !== product));
    } else {
      setSelectedProducts([...selectedProducts, product]);
    }
  };

  // Staff Assignment Handlers
  const handleAddStaff = (staff: { name: string; role: string }) => {
    if (!assignedStaff.some((s) => s.name === staff.name)) {
      setAssignedStaff([...assignedStaff, staff]);
    }
  };

  const handleRemoveStaff = (staffName: string) => {
    setAssignedStaff(assignedStaff.filter((s) => s.name !== staffName));
  };

  // Existing Customer Search Matches
  const matchingCustomers = Object.values(MOCK_CUSTOMERS).filter((c) => {
    if (!customerSearchQuery.trim()) return false;
    const q = customerSearchQuery.toLowerCase();
    return (
      c.fullName.toLowerCase().includes(q) ||
      c.phone.includes(q) ||
      c.cif.includes(q) ||
      c.email.toLowerCase().includes(q)
    );
  });

  const handleSubmit = () => {
    const finalCustomer =
      customerMode === 'New Customer'
        ? customerName.trim()
        : selectedCustomer?.fullName || '';

    const finalPhone =
      customerMode === 'New Customer'
        ? phone.trim()
        : selectedCustomer?.phone || '';

    if (!finalCustomer) {
      Alert.alert('Required Field Missing', 'Please provide a customer name.');
      return;
    }
    if (!finalPhone) {
      Alert.alert('Required Field Missing', 'Please provide a valid phone number.');
      return;
    }

    const newLead: Partial<Lead> = {
      customer: finalCustomer,
      phone: finalPhone,
      location:
        customerMode === 'New Customer'
          ? location
          : selectedCustomer?.address || '',
      segment,
      productInterest: selectedProducts.join(', ') || 'Savings account',
      priority,
      potentialValue: Number(potentialValue) || 10000,
      potentialCurrency: currency,
      assignedTo: assignedStaff.map((s) => s.name),
      status: leadStatus,
      leadSource,
      referee: leadSource === 'Referral' || leadSource === 'Referee' ? referee : undefined,
      notes,
      branch,
      initiator,
      cif: selectedCustomer?.cif,
    };

    onSubmit(newLead);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container}
    >
      {/* Top Header */}
      <View style={styles.topHeader}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={onBack}
          hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
        >
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          {customerMode === 'New Customer'
            ? 'Capture Lead: New Customer'
            : 'Capture Lead: Existing Customer'}
        </Text>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={onBack}
          hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
        >
          <Text style={styles.closeIcon}>✕</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollArea} showsVerticalScrollIndicator={false}>
        {/* Switcher: New Customer vs Existing Customer */}
        <View style={styles.switcherContainer}>
          <SegmentedControl
            options={['New Customer', 'Existing Customer']}
            selectedOption={customerMode}
            onSelect={(val) => {
              setCustomerMode(val);
              setSelectedCustomer(null);
            }}
          />
        </View>

        {/* Card 1: Customer Identification */}
        <View style={[styles.card, Shadows.card]}>
          <View style={styles.cardHeaderRow}>
            <Text style={styles.cardTitle}>1. Customer Identification</Text>
            <Text style={styles.mandatoryNote}>* Required</Text>
          </View>

          {customerMode === 'New Customer' ? (
            <>
              <View style={styles.formGroup}>
                <Text style={styles.label}>Customer Name *</Text>
                <TextInput
                  style={styles.input}
                  placeholder="e.g. John Kamau Mwangi"
                  placeholderTextColor={Colors.textMuted}
                  value={customerName}
                  onChangeText={setCustomerName}
                />
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.label}>Phone Number *</Text>
                <View style={styles.phoneInputRow}>
                  <View style={styles.countryCodeBadge}>
                    <Text style={styles.countryCodeText}>+254</Text>
                  </View>
                  <TextInput
                    style={[styles.input, { flex: 1, borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }]}
                    placeholder="712 345 678"
                    placeholderTextColor={Colors.textMuted}
                    keyboardType="phone-pad"
                    value={phone}
                    onChangeText={setPhone}
                  />
                </View>
              </View>

              <View style={styles.formGroup}>
                <View style={styles.labelWithAction}>
                  <Text style={styles.label}>Physical Location</Text>
                  <TouchableOpacity
                    style={styles.gpsButton}
                    onPress={handleUseGps}
                    disabled={gpsLoading}
                  >
                    <Text style={styles.gpsButtonText}>
                      {gpsLoading ? '📍 Locating...' : '📍 Use Current GPS'}
                    </Text>
                  </TouchableOpacity>
                </View>
                <TextInput
                  style={styles.input}
                  placeholder="e.g. Westlands, Nairobi or GPS coordinates"
                  placeholderTextColor={Colors.textMuted}
                  value={location}
                  onChangeText={setLocation}
                />
              </View>
            </>
          ) : (
            // Existing Customer Autocomplete Search
            <>
              {!selectedCustomer ? (
                <View style={styles.formGroup}>
                  <Text style={styles.label}>Search Existing Customer *</Text>
                  <View style={styles.searchWrapper}>
                    <Text style={styles.searchIcon}>🔍</Text>
                    <TextInput
                      style={styles.searchInput}
                      placeholder="Search by CIF, Name, ID, or Phone..."
                      placeholderTextColor={Colors.textMuted}
                      value={customerSearchQuery}
                      onChangeText={setCustomerSearchQuery}
                    />
                  </View>

                  {/* Suggestion Dropdown */}
                  {matchingCustomers.length > 0 && (
                    <View style={styles.suggestionsContainer}>
                      {matchingCustomers.map((cust) => (
                        <TouchableOpacity
                          key={cust.cif}
                          style={styles.suggestionItem}
                          onPress={() => {
                            setSelectedCustomer(cust);
                            setCustomerSearchQuery('');
                          }}
                        >
                          <View style={styles.suggestionAvatar}>
                            <Text style={styles.suggestionAvatarText}>
                              {cust.fullName.charAt(0)}
                            </Text>
                          </View>
                          <View style={styles.suggestionInfo}>
                            <Text style={styles.suggestionName}>
                              {cust.fullName}
                            </Text>
                            <Text style={styles.suggestionMeta}>
                              CIF: {cust.cif} • {cust.phone} • {cust.customerType}
                            </Text>
                          </View>
                          <Text style={styles.suggestionSelect}>Select ›</Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  )}
                </View>
              ) : (
                // Verified Customer Summary Card
                <View style={styles.selectedCustomerCard}>
                  <View style={styles.selectedCustomerHeader}>
                    <View style={styles.selectedCustomerAvatar}>
                      <Text style={styles.selectedCustomerAvatarText}>
                        {selectedCustomer.fullName.charAt(0)}
                      </Text>
                    </View>
                    <View style={{ flex: 1 }}>
                      <View style={styles.verifiedRow}>
                        <Text style={styles.selectedCustomerName}>
                          {selectedCustomer.fullName}
                        </Text>
                        <Text style={styles.verifiedBadge}>✓ CBS Verified</Text>
                      </View>
                      <Text style={styles.selectedCustomerDetail}>
                        CIF: {selectedCustomer.cif} • ID: {selectedCustomer.idPassport}
                      </Text>
                      <Text style={styles.selectedCustomerDetail}>
                        📞 {selectedCustomer.phone} • ✉️ {selectedCustomer.email}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.customerActionRow}>
                    <TouchableOpacity
                      style={styles.view360Btn}
                      onPress={() => onOpenCustomer360(selectedCustomer.cif)}
                    >
                      <Text style={styles.view360BtnText}>
                        🔍 View Customer 360
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.changeCustomerBtn}
                      onPress={() => setSelectedCustomer(null)}
                    >
                      <Text style={styles.changeCustomerBtnText}>Change</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </>
          )}
        </View>

        {/* Card 2: Lead Categorization */}
        <View style={[styles.card, Shadows.card]}>
          <Text style={styles.cardTitle}>2. Lead Categorization</Text>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Lead Type *</Text>
            <TextInput
              style={[styles.input, { backgroundColor: Colors.surfaceInput }]}
              value={leadType}
              editable={false}
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Branch Name *</Text>
            <View style={styles.chipRow}>
              {BRANCHES.map((b) => (
                <TouchableOpacity
                  key={b}
                  style={[
                    styles.selectableChip,
                    branch === b && styles.selectableChipActive,
                  ]}
                  onPress={() => setBranch(b)}
                >
                  <Text
                    style={[
                      styles.selectableChipText,
                      branch === b && styles.selectableChipTextActive,
                    ]}
                  >
                    {b}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Description *</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Describe customer business need or engagement background..."
              placeholderTextColor={Colors.textMuted}
              multiline
              numberOfLines={3}
              value={description}
              onChangeText={setDescription}
            />
          </View>
        </View>

        {/* Card 3: Commercial & Product Details */}
        <View style={[styles.card, Shadows.card]}>
          <Text style={styles.cardTitle}>3. Commercial & Product Details</Text>

          {/* Lead Source */}
          <View style={styles.formGroup}>
            <Text style={styles.label}>Lead Source *</Text>
            <View style={styles.chipRow}>
              {['Referral', 'Contact Centre', 'Door to Door', 'Website Inquiry'].map(
                (src) => (
                  <TouchableOpacity
                    key={src}
                    style={[
                      styles.selectableChip,
                      leadSource === src && styles.selectableChipActive,
                    ]}
                    onPress={() => setLeadSource(src)}
                  >
                    <Text
                      style={[
                        styles.selectableChipText,
                        leadSource === src && styles.selectableChipTextActive,
                      ]}
                    >
                      {src}
                    </Text>
                  </TouchableOpacity>
                )
              )}
            </View>
          </View>

          {/* Conditional Referee Field (Source === Referral / Referee) */}
          {(leadSource === 'Referral' || leadSource === 'Referee') && (
            <View style={styles.conditionalContainer}>
              <Text style={styles.label}>Referee Name / Account *</Text>
              <TextInput
                style={[styles.input, styles.conditionalInput]}
                placeholder="Enter referring customer or staff name..."
                placeholderTextColor={Colors.textMuted}
                value={referee}
                onChangeText={setReferee}
              />
              <Text style={styles.fieldHint}>
                ⚡ Required when Lead Source is Referral
              </Text>
            </View>
          )}

          {/* Customer Segment */}
          <View style={styles.formGroup}>
            <Text style={styles.label}>Customer Segment *</Text>
            <View style={styles.chipRow}>
              {(['Retail', 'Corporate', 'Business'] as CustomerSegment[]).map(
                (seg) => (
                  <TouchableOpacity
                    key={seg}
                    style={[
                      styles.selectableChip,
                      segment === seg && styles.selectableChipActive,
                    ]}
                    onPress={() => setSegment(seg)}
                  >
                    <Text
                      style={[
                        styles.selectableChipText,
                        segment === seg && styles.selectableChipTextActive,
                      ]}
                    >
                      {seg}
                    </Text>
                  </TouchableOpacity>
                )
              )}
            </View>
          </View>

          {/* Priority */}
          <View style={styles.formGroup}>
            <Text style={styles.label}>Lead Priority *</Text>
            <View style={styles.chipRow}>
              {(['Low', 'Medium', 'High'] as LeadPriority[]).map((p) => (
                <TouchableOpacity
                  key={p}
                  style={[
                    styles.selectableChip,
                    priority === p && styles.selectableChipActive,
                  ]}
                  onPress={() => setPriority(p)}
                >
                  <Text
                    style={[
                      styles.selectableChipText,
                      priority === p && styles.selectableChipTextActive,
                    ]}
                  >
                    {p}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Estimated Value */}
          <View style={styles.formGroup}>
            <Text style={styles.label}>Estimated Value *</Text>
            <View style={styles.valueInputRow}>
              <TouchableOpacity
                style={styles.currencyToggle}
                onPress={() => setCurrency(currency === 'KES' ? 'USD' : 'KES')}
              >
                <Text style={styles.currencyToggleText}>{currency} ▾</Text>
              </TouchableOpacity>
              <TextInput
                style={[
                  styles.input,
                  { flex: 1, borderTopLeftRadius: 0, borderBottomLeftRadius: 0 },
                ]}
                placeholder="e.g. 500,000"
                placeholderTextColor={Colors.textMuted}
                keyboardType="numeric"
                value={potentialValue}
                onChangeText={setPotentialValue}
              />
            </View>
          </View>

          {/* Product Type Multi-Select */}
          <View style={styles.formGroup}>
            <Text style={styles.label}>Product Type (Multi-Select) *</Text>
            <View style={styles.chipWrapRow}>
              {AVAILABLE_PRODUCTS.map((prod) => {
                const isSelected = selectedProducts.includes(prod);
                return (
                  <TouchableOpacity
                    key={prod}
                    style={[
                      styles.productTag,
                      isSelected && styles.productTagActive,
                    ]}
                    onPress={() => handleToggleProduct(prod)}
                  >
                    <Text
                      style={[
                        styles.productTagText,
                        isSelected && styles.productTagTextActive,
                      ]}
                    >
                      {prod}
                    </Text>
                    {isSelected && (
                      <View style={styles.trashHitbox}>
                        <Text style={styles.trashIcon}>✕</Text>
                      </View>
                    )}
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        </View>

        {/* Card 4: Assignment & Remarks */}
        <View style={[styles.card, Shadows.card]}>
          <Text style={styles.cardTitle}>4. Assignment & Remarks</Text>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Lead Initiator *</Text>
            <TextInput
              style={[styles.input, { backgroundColor: Colors.surfaceInput }]}
              value={initiator}
              editable={false}
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Lead Status *</Text>
            <View style={styles.chipRow}>
              {(['New', 'Cold', 'Warm', 'Hot', 'Nurturing'] as LeadStatus[]).map(
                (st) => (
                  <TouchableOpacity
                    key={st}
                    style={[
                      styles.selectableChip,
                      leadStatus === st && styles.selectableChipActive,
                    ]}
                    onPress={() => setLeadStatus(st)}
                  >
                    <Text
                      style={[
                        styles.selectableChipText,
                        leadStatus === st && styles.selectableChipTextActive,
                      ]}
                    >
                      {st}
                    </Text>
                  </TouchableOpacity>
                )
              )}
            </View>
          </View>

          {/* Assigned Staff Chips */}
          <View style={styles.formGroup}>
            <Text style={styles.label}>Assigned Staff</Text>
            <View style={styles.assignedStaffContainer}>
              {assignedStaff.map((staff) => (
                <View key={staff.name} style={styles.staffChip}>
                  <Text style={styles.staffChipName}>{staff.name}</Text>
                  <View style={styles.staffRoleBadge}>
                    <Text style={styles.staffRoleText}>{staff.role}</Text>
                  </View>
                  <TouchableOpacity
                    style={styles.deleteStaffTarget}
                    onPress={() => handleRemoveStaff(staff.name)}
                    hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                  >
                    <Text style={styles.deleteStaffIcon}>✕</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>

            {/* Quick Add Staff List */}
            <Text style={styles.subLabel}>Available Officers:</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: 4 }}>
              {AVAILABLE_STAFF.map((staff) => (
                <TouchableOpacity
                  key={staff.name}
                  style={styles.addStaffChip}
                  onPress={() => handleAddStaff(staff)}
                >
                  <Text style={styles.addStaffText}>＋ {staff.name}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Comments or Notes</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Add internal notes for the sales team..."
              placeholderTextColor={Colors.textMuted}
              multiline
              numberOfLines={3}
              value={notes}
              onChangeText={setNotes}
            />
          </View>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Sticky Bottom Action Bar */}
      <View style={[styles.bottomBar, Shadows.floating]}>
        <TouchableOpacity style={styles.cancelButton} onPress={onBack}>
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Create Lead</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.surfaceBg,
  },
  topHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.md,
    height: 54,
    backgroundColor: Colors.surfaceCard,
    borderBottomWidth: 1,
    borderBottomColor: Colors.surfaceBorder,
  },
  backButton: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backArrow: {
    fontSize: 20,
    color: Colors.textPrimary,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  closeButton: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeIcon: {
    fontSize: 16,
    color: Colors.textMuted,
  },
  scrollArea: {
    flex: 1,
    padding: Spacing.md,
  },
  switcherContainer: {
    marginBottom: Spacing.md,
  },
  card: {
    backgroundColor: Colors.surfaceCard,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    borderColor: Colors.surfaceBorder,
    padding: Spacing.md,
    marginBottom: Spacing.md,
  },
  cardHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.brandDark,
    marginBottom: Spacing.xs,
  },
  mandatoryNote: {
    fontSize: 11,
    color: Colors.status.hot.text,
  },
  formGroup: {
    marginTop: Spacing.sm,
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.textSecondary,
    marginBottom: 4,
  },
  subLabel: {
    fontSize: 11,
    color: Colors.textMuted,
    marginTop: 8,
  },
  labelWithAction: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  gpsButton: {
    backgroundColor: Colors.brandSubtle,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: BorderRadius.sm,
  },
  gpsButtonText: {
    fontSize: 11,
    fontWeight: '600',
    color: Colors.brandPrimary,
  },
  input: {
    backgroundColor: Colors.surfaceInput,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: Colors.surfaceBorder,
    paddingHorizontal: Spacing.sm,
    height: 42,
    fontSize: 13,
    color: Colors.textPrimary,
  },
  textArea: {
    height: 72,
    paddingVertical: 8,
    textAlignVertical: 'top',
  },
  phoneInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  countryCodeBadge: {
    height: 42,
    paddingHorizontal: 12,
    backgroundColor: Colors.surfaceBorder,
    borderTopLeftRadius: BorderRadius.md,
    borderBottomLeftRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: Colors.surfaceBorder,
    alignItems: 'center',
    justifyContent: 'center',
  },
  countryCodeText: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  searchWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surfaceInput,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: Colors.surfaceBorder,
    paddingHorizontal: Spacing.sm,
    height: 42,
  },
  searchIcon: {
    fontSize: 13,
    marginRight: 6,
  },
  searchInput: {
    flex: 1,
    fontSize: 13,
    color: Colors.textPrimary,
  },
  suggestionsContainer: {
    backgroundColor: Colors.surfaceCard,
    borderWidth: 1,
    borderColor: Colors.surfaceBorder,
    borderRadius: BorderRadius.md,
    marginTop: 4,
    maxHeight: 180,
  },
  suggestionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: Colors.surfaceBorder,
  },
  suggestionAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.brandDark,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.sm,
  },
  suggestionAvatarText: {
    color: Colors.textInverse,
    fontWeight: '700',
    fontSize: 13,
  },
  suggestionInfo: {
    flex: 1,
  },
  suggestionName: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  suggestionMeta: {
    fontSize: 11,
    color: Colors.textMuted,
    marginTop: 1,
  },
  suggestionSelect: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.brandPrimary,
  },
  selectedCustomerCard: {
    backgroundColor: Colors.brandSubtle,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: Colors.brandAccent,
    padding: Spacing.md,
  },
  selectedCustomerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectedCustomerAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.brandPrimary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  selectedCustomerAvatarText: {
    color: Colors.textInverse,
    fontWeight: '800',
    fontSize: 18,
  },
  verifiedRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  selectedCustomerName: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.brandDark,
  },
  verifiedBadge: {
    fontSize: 10,
    fontWeight: '700',
    color: Colors.status.converted.text,
  },
  selectedCustomerDetail: {
    fontSize: 11,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  customerActionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: Spacing.md,
    paddingTop: Spacing.sm,
    borderTopWidth: 1,
    borderTopColor: 'rgba(235, 106, 0, 0.2)',
  },
  view360Btn: {
    backgroundColor: Colors.brandPrimary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: BorderRadius.sm,
  },
  view360BtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.textInverse,
  },
  changeCustomerBtn: {
    paddingHorizontal: 8,
    paddingVertical: 6,
  },
  changeCustomerBtnText: {
    fontSize: 12,
    color: Colors.textSecondary,
    textDecorationLine: 'underline',
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  chipWrapRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginTop: 4,
  },
  selectableChip: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.surfaceInput,
    borderWidth: 1,
    borderColor: Colors.surfaceBorder,
  },
  selectableChipActive: {
    backgroundColor: Colors.brandSubtle,
    borderColor: Colors.brandPrimary,
  },
  selectableChipText: {
    fontSize: 12,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  selectableChipTextActive: {
    color: Colors.brandPrimary,
    fontWeight: '700',
  },
  conditionalContainer: {
    backgroundColor: '#FFF7ED',
    borderLeftWidth: 3,
    borderLeftColor: Colors.brandPrimary,
    padding: Spacing.sm,
    borderRadius: BorderRadius.sm,
    marginVertical: Spacing.xs,
  },
  conditionalInput: {
    backgroundColor: Colors.surfaceCard,
    marginTop: 4,
  },
  fieldHint: {
    fontSize: 10,
    color: Colors.brandDark,
    marginTop: 4,
    fontStyle: 'italic',
  },
  valueInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  currencyToggle: {
    height: 42,
    paddingHorizontal: 12,
    backgroundColor: Colors.surfaceBorder,
    borderTopLeftRadius: BorderRadius.md,
    borderBottomLeftRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: Colors.surfaceBorder,
    alignItems: 'center',
    justifyContent: 'center',
  },
  currencyToggleText: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  productTag: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.surfaceInput,
    borderWidth: 1,
    borderColor: Colors.surfaceBorder,
    gap: 6,
  },
  productTagActive: {
    backgroundColor: Colors.brandDark,
    borderColor: Colors.brandDark,
  },
  productTagText: {
    fontSize: 12,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  productTagTextActive: {
    color: Colors.textInverse,
    fontWeight: '600',
  },
  trashHitbox: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  trashIcon: {
    fontSize: 10,
    color: Colors.textInverse,
    fontWeight: 'bold',
  },
  assignedStaffContainer: {
    gap: 6,
    marginTop: 4,
  },
  staffChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surfaceInput,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: Colors.surfaceBorder,
    gap: 8,
  },
  staffChipName: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.textPrimary,
    flex: 1,
  },
  staffRoleBadge: {
    backgroundColor: Colors.brandSubtle,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: BorderRadius.xs,
  },
  staffRoleText: {
    fontSize: 10,
    fontWeight: '600',
    color: Colors.brandPrimary,
  },
  deleteStaffTarget: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    backgroundColor: Colors.surfaceBorder,
  },
  deleteStaffIcon: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  addStaffChip: {
    backgroundColor: Colors.surfaceInput,
    borderWidth: 1,
    borderColor: Colors.surfaceBorder,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: BorderRadius.full,
    marginRight: 6,
  },
  addStaffText: {
    fontSize: 11,
    color: Colors.brandDark,
    fontWeight: '600',
  },
  bottomBar: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.md,
    backgroundColor: Colors.surfaceCard,
    borderTopWidth: 1,
    borderTopColor: Colors.surfaceBorder,
    gap: Spacing.md,
  },
  cancelButton: {
    flex: 1,
    height: 48,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: Colors.surfaceBorder,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  submitButton: {
    flex: 2,
    height: 48,
    backgroundColor: Colors.brandPrimary,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.textInverse,
  },
});
