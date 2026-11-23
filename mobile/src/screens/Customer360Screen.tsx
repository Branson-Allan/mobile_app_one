import React, { useMemo, useState } from 'react';
import {
  Alert,
  Linking,
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
import { Customer360, Customer360Segment } from '../types';

interface Customer360ScreenProps {
  cif?: string;
  onBack?: () => void;
  onSelectCustomer?: (cif: string) => void;
}

export const Customer360Screen: React.FC<Customer360ScreenProps> = ({
  cif = '837649',
  onBack,
  onSelectCustomer,
}) => {
  const [activeSegment, setActiveSegment] = useState<string>('Accounts');
  const [selectedAccountIndex, setSelectedAccountIndex] = useState<number>(0);
  const [complianceExpanded, setComplianceExpanded] = useState<boolean>(true);
  const [activityFilter, setActivityFilter] = useState<string>('Leads');
  const [activeCif, setActiveCif] = useState<string>(cif);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Sync if cif prop changes externally (e.g. from lead card click)
  React.useEffect(() => {
    if (cif && cif !== activeCif) {
      setActiveCif(cif);
      setSelectedAccountIndex(0);
    }
  }, [cif]);

  // Live filter across all customer attributes
  const matchingResults = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return [];
    return Object.values(MOCK_CUSTOMERS).filter((c) => {
      const inName = c.fullName.toLowerCase().includes(q);
      const inCif = c.cif.includes(q);
      const inId = c.idPassport.includes(q);
      const inPhone = c.phone.replace(/\s+/g, '').includes(q.replace(/\s+/g, ''));
      const inEmail = c.email.toLowerCase().includes(q);
      const inAccounts = c.accounts.some((acc) => acc.accountNumber.includes(q));
      return inName || inCif || inId || inPhone || inEmail || inAccounts;
    });
  }, [searchQuery]);

  const customer: Customer360 = MOCK_CUSTOMERS[activeCif] || MOCK_CUSTOMERS['837649'];

  const handleCall = () => {
    if (customer.phone) {
      Linking.openURL(`tel:${customer.phone.replace(/\s+/g, '')}`);
    }
  };

  const handleEmail = () => {
    if (customer.email) {
      Linking.openURL(`mailto:${customer.email}`);
    }
  };

  const handleChat = () => {
    Alert.alert('Omnichannel Chat', `Starting CRM messaging thread with ${customer.fullName}`);
  };

  const handleAddTask = () => {
    Alert.alert('Add Task', `Creating new follow-up task for customer ${customer.fullName} (${customer.cif})`);
  };

  return (
    <View style={styles.container}>
      {/* Top Bar with Search Input & Quick Customer Switcher */}
      <View style={styles.topBar}>
        <View style={styles.topBarTitleRow}>
          {onBack ? (
            <TouchableOpacity
              style={styles.backBtn}
              onPress={onBack}
              hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
            >
              <Text style={styles.backArrow}>←</Text>
            </TouchableOpacity>
          ) : null}
          <Text style={styles.topBarTitle}>Customer 360° Profile</Text>
          <View style={styles.customerCountBadge}>
            <Text style={styles.customerCountText}>
              {Object.keys(MOCK_CUSTOMERS).length} Profiles
            </Text>
          </View>
        </View>

        {/* Dedicated Search Input Bar */}
        <View style={styles.searchBar}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Search by Name, CIF, National ID, Phone..."
            placeholderTextColor={Colors.textMuted}
            value={searchQuery}
            onChangeText={setSearchQuery}
            returnKeyType="search"
            clearButtonMode="while-editing"
          />
          {searchQuery ? (
            <TouchableOpacity
              onPress={() => setSearchQuery('')}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            >
              <Text style={styles.clearSearchIcon}>✕</Text>
            </TouchableOpacity>
          ) : null}
        </View>

        {/* Quick Customer Switcher Chips (when not actively searching) */}
        {!searchQuery.trim() && (
          <View style={styles.customerSwitcherContainer}>
            <Text style={styles.switcherLabel}>Quick Switch:</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.switcherContent}
            >
              {Object.keys(MOCK_CUSTOMERS).map((key) => {
                const c = MOCK_CUSTOMERS[key];
                const isCurrent = key === activeCif;
                return (
                  <TouchableOpacity
                    key={key}
                    style={[
                      styles.switcherChip,
                      isCurrent && styles.switcherChipActive,
                    ]}
                    onPress={() => {
                      setActiveCif(key);
                      setSelectedAccountIndex(0);
                      if (onSelectCustomer) onSelectCustomer(key);
                    }}
                  >
                    <Text
                      style={[
                        styles.switcherChipText,
                        isCurrent && styles.switcherChipTextActive,
                      ]}
                    >
                      {c.fullName.split(' ')[0]} ({c.cif})
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>
        )}
      </View>

      {/* Live Search Results Dropdown Panel */}
      {searchQuery.trim().length > 0 && (
        <View style={[styles.searchResultsPanel, Shadows.modal]}>
          <View style={styles.searchResultsHeader}>
            <Text style={styles.searchResultsCount}>
              Found {matchingResults.length} matching customer
              {matchingResults.length === 1 ? '' : 's'}:
            </Text>
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Text style={styles.dismissSearchText}>Close Search ✕</Text>
            </TouchableOpacity>
          </View>

          {matchingResults.length > 0 ? (
            matchingResults.map((item) => (
              <TouchableOpacity
                key={item.cif}
                style={styles.searchResultItem}
                onPress={() => {
                  setActiveCif(item.cif);
                  setSelectedAccountIndex(0);
                  setSearchQuery('');
                  if (onSelectCustomer) onSelectCustomer(item.cif);
                }}
              >
                <View style={styles.resultAvatar}>
                  <Text style={styles.resultAvatarText}>
                    {item.fullName.charAt(0)}
                  </Text>
                </View>
                <View style={styles.resultInfo}>
                  <View style={styles.resultTitleRow}>
                    <Text style={styles.resultName}>{item.fullName}</Text>
                    <View style={styles.resultTypeBadge}>
                      <Text style={styles.resultTypeText}>
                        {item.customerType}
                      </Text>
                    </View>
                  </View>
                  <Text style={styles.resultMeta}>
                    CIF: <Text style={styles.boldMono}>{item.cif}</Text> • ID:{' '}
                    <Text style={styles.boldMono}>{item.idPassport}</Text> • 📞{' '}
                    {item.phone}
                  </Text>
                  <Text style={styles.resultSub}>
                    🏢 {item.accounts[0]?.branchName || 'DTB Branch'} •{' '}
                    {item.accounts.length} Active Accounts
                  </Text>
                </View>
                <View style={styles.viewResultBadge}>
                  <Text style={styles.viewResultBadgeText}>View 360° ›</Text>
                </View>
              </TouchableOpacity>
            ))
          ) : (
            <View style={styles.noResultsBox}>
              <Text style={styles.noResultsIcon}>🔍</Text>
              <Text style={styles.noResultsTitle}>No Customers Found</Text>
              <Text style={styles.noResultsText}>
                No customer matches "{searchQuery}".
              </Text>
              <Text style={styles.noResultsHint}>
                Try searching by Name (e.g. "Bilal", "Ogacho", "Sakwa"),
                6-digit CIF, National ID, or Phone.
              </Text>
            </View>
          )}
        </View>
      )}

      <ScrollView style={styles.scrollArea} showsVerticalScrollIndicator={false}>
        {/* Customer Identity Header Card */}
        <View style={[styles.profileCard, Shadows.card]}>
          <View style={styles.profileHeader}>
            <View style={styles.avatarCircle}>
              <Text style={styles.avatarInitial}>
                {customer.fullName.charAt(0)}
              </Text>
              <View style={styles.verifiedCheck}>
                <Text style={styles.verifiedCheckText}>✓</Text>
              </View>
            </View>

            <View style={styles.profileMainInfo}>
              <View style={styles.nameRow}>
                <Text style={styles.customerName}>{customer.fullName}</Text>
                <View style={styles.typeBadge}>
                  <Text style={styles.typeBadgeText}>{customer.customerType}</Text>
                </View>
              </View>

              <Text style={styles.cifPassport}>
                CIF: <Text style={styles.boldMono}>{customer.cif}</Text> • ID/PP:{' '}
                <Text style={styles.boldMono}>{customer.idPassport}</Text>
              </Text>

              <Text style={styles.demographics}>
                {customer.gender} • {customer.age} yrs • DOB: {customer.dob} •{' '}
                {customer.nationality}
              </Text>

              <Text style={styles.addressText} numberOfLines={1}>
                📍 {customer.address}
              </Text>
            </View>
          </View>

          {/* Quick Omnichannel Contact Toolbar (48px Touch Targets) */}
          <View style={styles.commsBar}>
            <TouchableOpacity style={styles.commsButton} onPress={handleCall}>
              <Text style={styles.commsIcon}>📞</Text>
              <Text style={styles.commsLabel}>Call</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.commsButton} onPress={handleEmail}>
              <Text style={styles.commsIcon}>✉️</Text>
              <Text style={styles.commsLabel}>Email</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.commsButton} onPress={handleChat}>
              <Text style={styles.commsIcon}>💬</Text>
              <Text style={styles.commsLabel}>Chat</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.commsButton} onPress={handleAddTask}>
              <Text style={styles.commsIcon}>➕</Text>
              <Text style={styles.commsLabel}>Task</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* DTB Banking Segments Control */}
        <View style={styles.segmentContainer}>
          <SegmentedControl
            options={['Accounts', 'Mobile Banking', 'Bancassurance', 'Credit Card']}
            selectedOption={activeSegment}
            onSelect={setActiveSegment}
          />
        </View>

        {/* =========================================================================
            Segment 1: ACCOUNTS (Screen M-3.2.1)
           ========================================================================= */}
        {activeSegment === 'Accounts' && (
          <View style={styles.segmentContent}>
            <Text style={styles.sectionHeading}>Core Banking Accounts</Text>

            {customer.accounts.length === 0 ? (
              <View style={styles.emptyCard}>
                <Text style={styles.emptyText}>No core banking accounts found.</Text>
              </View>
            ) : (
              customer.accounts.map((acc, idx) => {
                const isSelected = selectedAccountIndex === idx;
                return (
                  <TouchableOpacity
                    key={acc.accountNumber}
                    activeOpacity={0.8}
                    style={[
                      styles.accountCard,
                      Shadows.card,
                      isSelected && styles.accountCardSelected,
                    ]}
                    onPress={() => setSelectedAccountIndex(idx)}
                  >
                    <View style={styles.accCardHeader}>
                      <View>
                        <Text style={styles.accNumber}>{acc.accountNumber}</Text>
                        <Text style={styles.accClass}>{acc.accountClass}</Text>
                      </View>
                      <View style={styles.accStatusPill}>
                        <Text style={styles.accStatusText}>{acc.status}</Text>
                      </View>
                    </View>

                    <Text style={styles.accBranch}>
                      🏢 {acc.branchName} (Code: {acc.branchCode})
                    </Text>

                    {acc.coOwners && acc.coOwners.length > 0 && (
                      <View style={styles.coOwnersRow}>
                        <Text style={styles.coOwnersLabel}>Co-Owners:</Text>
                        <View style={styles.coOwnerChips}>
                          {acc.coOwners.map((owner, oIdx) => (
                            <View key={oIdx} style={styles.coOwnerChip}>
                              <Text style={styles.coOwnerText}>{owner}</Text>
                            </View>
                          ))}
                        </View>
                      </View>
                    )}

                    <View style={styles.accFooter}>
                      <Text style={styles.fdrStatus}>
                        FDR Status: {acc.hasFdr ? 'Yes (Fixed Deposit)' : 'No FDR'}
                      </Text>
                      <TouchableOpacity
                        style={styles.addTaskBtn}
                        onPress={handleAddTask}
                      >
                        <Text style={styles.addTaskText}>＋ Add to Task</Text>
                      </TouchableOpacity>
                    </View>
                  </TouchableOpacity>
                );
              })
            )}

            {/* Dynamic Active Products for Selected Account */}
            {customer.accounts[selectedAccountIndex] && (
              <View style={[styles.productsBox, Shadows.card]}>
                <Text style={styles.productsBoxTitle}>
                  Active Products for Account{' '}
                  <Text style={styles.boldMono}>
                    {customer.accounts[selectedAccountIndex].accountNumber}
                  </Text>
                </Text>
                <View style={styles.productList}>
                  {customer.accounts[selectedAccountIndex].activeProducts.map(
                    (p) => (
                      <View key={p.name} style={styles.productItem}>
                        <Text
                          style={[
                            styles.productStatusIcon,
                            p.active
                              ? styles.productActive
                              : styles.productInactive,
                          ]}
                        >
                          {p.active ? '✓' : '—'}
                        </Text>
                        <Text
                          style={[
                            styles.productName,
                            !p.active && styles.productNameInactive,
                          ]}
                        >
                          {p.name}
                        </Text>
                        <Text style={styles.productStateBadge}>
                          {p.active ? 'Subscribed' : 'Not Activated'}
                        </Text>
                      </View>
                    )
                  )}
                </View>
              </View>
            )}

            {/* DTB Compliance Accordion */}
            <View style={[styles.complianceCard, Shadows.card]}>
              <TouchableOpacity
                style={styles.complianceHeader}
                onPress={() => setComplianceExpanded(!complianceExpanded)}
              >
                <View style={styles.complianceTitleRow}>
                  <Text style={styles.complianceIcon}>🛡️</Text>
                  <Text style={styles.complianceTitle}>DTB Compliance & KYC</Text>
                </View>
                <Text style={styles.accordionArrow}>
                  {complianceExpanded ? '▲' : '▼'}
                </Text>
              </TouchableOpacity>

              {complianceExpanded && (
                <View style={styles.complianceBody}>
                  <View style={styles.complianceRow}>
                    <Text style={styles.complianceLabel}>KYC Status:</Text>
                    <View style={styles.kycVerifiedBadge}>
                      <Text style={styles.kycVerifiedText}>
                        ✓ {customer.compliance.kycStatus}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.complianceRow}>
                    <Text style={styles.complianceLabel}>Risk Rating:</Text>
                    <Text style={styles.riskRatingText}>
                      {customer.compliance.riskRating}
                    </Text>
                  </View>

                  <View style={styles.complianceRow}>
                    <Text style={styles.complianceLabel}>AML Clearance:</Text>
                    <Text style={styles.amlText}>
                      {customer.compliance.amlChecked ? 'Passed' : 'Pending'}
                    </Text>
                  </View>
                </View>
              )}
            </View>

            {/* Multi-Channel Activity History Feed */}
            <View style={[styles.activitySection, Shadows.card]}>
              <View style={styles.activityHeaderRow}>
                <Text style={styles.sectionHeading}>Activity History</Text>
                <View style={styles.filterPills}>
                  {['All', 'Leads', 'Tickets', 'Events'].map((tab) => (
                    <TouchableOpacity
                      key={tab}
                      style={[
                        styles.actFilterChip,
                        activityFilter === tab && styles.actFilterChipActive,
                      ]}
                      onPress={() => setActivityFilter(tab)}
                    >
                      <Text
                        style={[
                          styles.actFilterText,
                          activityFilter === tab && styles.actFilterTextActive,
                        ]}
                      >
                        {tab}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              <View style={styles.timelineList}>
                {customer.activityHistory.map((ev, idx) => (
                  <View key={ev.id} style={styles.timelineItem}>
                    <View style={styles.timelineNodeContainer}>
                      <View style={styles.timelineDot} />
                      {idx < customer.activityHistory.length - 1 && (
                        <View style={styles.timelineLine} />
                      )}
                    </View>
                    <View style={styles.timelineContent}>
                      <View style={styles.timelineTitleRow}>
                        <Text style={styles.timelineTitle}>{ev.title}</Text>
                        <Text style={styles.timelineTime}>
                          {ev.date} {ev.time || ''}
                        </Text>
                      </View>
                      <Text style={styles.timelineDetail}>{ev.detail}</Text>
                      {ev.comments ? (
                        <Text style={styles.timelineComments}>
                          {ev.comments}
                        </Text>
                      ) : null}
                      <Text style={styles.timelineAuthor}>
                        Logged by: {ev.author}
                      </Text>
                    </View>
                  </View>
                ))}
              </View>
            </View>

            {/* Touchpoint Statistics */}
            <View style={styles.statsRow}>
              <View style={[styles.statTile, Shadows.card]}>
                <Text style={styles.statVal}>
                  {customer.statistics.helpdeskTotal}
                </Text>
                <Text style={styles.statLabel}>Helpdesk Total</Text>
                <Text style={styles.statSub}>
                  ({customer.statistics.helpdeskOpen} Open)
                </Text>
              </View>
              <View style={[styles.statTile, Shadows.card]}>
                <Text style={styles.statVal}>
                  {customer.statistics.calendarScheduled}
                </Text>
                <Text style={styles.statLabel}>Meetings</Text>
                <Text style={styles.statSub}>Scheduled</Text>
              </View>
              <View style={[styles.statTile, Shadows.card]}>
                <Text style={styles.statVal}>
                  ★ {customer.statistics.feedbackRating}
                </Text>
                <Text style={styles.statLabel}>Feedback</Text>
                <Text style={styles.statSub}>
                  ({customer.statistics.feedbackCount} Reviews)
                </Text>
              </View>
            </View>
          </View>
        )}

        {/* =========================================================================
            Segment 2: MOBILE BANKING (Screen M-3.2.2)
           ========================================================================= */}
        {activeSegment === 'Mobile Banking' && (
          <View style={styles.segmentContent}>
            <View style={styles.mbHeaderRow}>
              <Text style={styles.sectionHeading}>
                Mobile Banking Profiles ({customer.mobileBanking.length})
              </Text>
              <View style={styles.mbBadge}>
                <Text style={styles.mbBadgeText}>DTB M-Banking Core</Text>
              </View>
            </View>

            {customer.mobileBanking.length === 0 ? (
              <View style={styles.emptyCard}>
                <Text style={styles.emptyText}>
                  No mobile banking accounts registered for this customer.
                </Text>
              </View>
            ) : (
              customer.mobileBanking.map((mb, idx) => (
                <View key={idx} style={[styles.mbCard, Shadows.card]}>
                  <View style={styles.mbCardTop}>
                    <View style={styles.mbAccInfo}>
                      <Text style={styles.mbAccNumber}>{mb.accountNumber}</Text>
                      <Text style={styles.mbBranchText}>
                        🏢 {mb.branchName} (Code: {mb.branchCode})
                      </Text>
                    </View>
                    <View
                      style={[
                        styles.pinBadge,
                        mb.pinStatus === 'Active Pin'
                          ? styles.pinBadgeActive
                          : styles.pinBadgeOtp,
                      ]}
                    >
                      <Text
                        style={[
                          styles.pinBadgeText,
                          mb.pinStatus === 'Active Pin'
                            ? styles.pinTextActive
                            : styles.pinTextOtp,
                        ]}
                      >
                        {mb.pinStatus}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.mbCardDivider} />

                  <View style={styles.mbCardBottom}>
                    <Text style={styles.mbMetaText}>
                      Security status: Verified Device
                    </Text>
                    <TouchableOpacity
                      style={styles.mbResetPinBtn}
                      onPress={() =>
                        Alert.alert(
                          'Reset PIN',
                          `Trigger OTP PIN reset procedure for account ${mb.accountNumber}?`
                        )
                      }
                    >
                      <Text style={styles.mbResetPinText}>Reset PIN</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))
            )}
          </View>
        )}

        {/* =========================================================================
            Segment 3: BANCASSURANCE (Screen M-3.2.3)
           ========================================================================= */}
        {activeSegment === 'Bancassurance' && (
          <View style={styles.segmentContent}>
            <Text style={styles.sectionHeading}>
              Bancassurance Policies ({customer.bancassurance.length})
            </Text>

            {customer.bancassurance.length === 0 ? (
              <View style={styles.emptyCard}>
                <Text style={styles.emptyText}>
                  No active insurance policies found for this customer.
                </Text>
              </View>
            ) : (
              customer.bancassurance.map((banca) => (
                <View
                  key={banca.policyNumber}
                  style={[styles.policyCard, Shadows.card]}
                >
                  <View style={styles.policyCardHeader}>
                    <View style={styles.policyLineTag}>
                      <Text style={styles.policyLineText}>
                        {banca.businessLine} INSURANCE
                      </Text>
                    </View>
                    <View style={styles.ipenTag}>
                      <Text style={styles.ipenText}>IPEN Valid</Text>
                    </View>
                  </View>

                  <Text style={styles.policyNumber}>{banca.policyNumber}</Text>
                  {banca.ipenProduct && (
                    <Text style={styles.policyProductName}>
                      Coverage: {banca.ipenProduct}
                    </Text>
                  )}

                  <View style={styles.policyFooter}>
                    <Text style={styles.policyExpiry}>
                      📅 Expiration: {banca.expirationDate}
                    </Text>
                    <TouchableOpacity
                      style={styles.renewPolicyBtn}
                      onPress={() =>
                        Alert.alert(
                          'Renew Policy',
                          `Request policy renewal quote for ${banca.policyNumber}`
                        )
                      }
                    >
                      <Text style={styles.renewPolicyText}>Renew</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))
            )}
          </View>
        )}

        {/* =========================================================================
            Segment 4: CREDIT CARDS (Screen M-3.2.4)
           ========================================================================= */}
        {activeSegment === 'Credit Card' && (
          <View style={styles.segmentContent}>
            <Text style={styles.sectionHeading}>
              Issued Credit Cards ({customer.creditCards.length})
            </Text>

            {customer.creditCards.length === 0 ? (
              <View style={styles.emptyCard}>
                <Text style={styles.emptyText}>
                  No credit cards issued for this profile.
                </Text>
              </View>
            ) : (
              customer.creditCards.map((card, idx) => {
                const isNavy = idx % 2 === 0;
                return (
                  <View
                    key={card.maskedPan}
                    style={[
                      styles.creditCardVisual,
                      isNavy ? styles.cardNavyBg : styles.cardDeepBlueBg,
                      Shadows.card,
                    ]}
                  >
                    <View style={styles.creditCardTopRow}>
                      <Text style={styles.bankBrand}>DTB Africa</Text>
                      <View
                        style={[
                          styles.cardStatusTag,
                          card.status === 'Normal'
                            ? styles.cardStatusNormal
                            : styles.cardStatusReplaced,
                        ]}
                      >
                        <Text style={styles.cardStatusTagText}>
                          {card.status}
                        </Text>
                      </View>
                    </View>

                    <View style={styles.chipGraphic}>
                      <View style={styles.chipLine} />
                      <View style={styles.chipLine} />
                    </View>

                    <Text style={styles.maskedPanText}>{card.maskedPan}</Text>

                    <View style={styles.creditCardBottomRow}>
                      <View>
                        <Text style={styles.cardHolderLabel}>CARDHOLDER</Text>
                        <Text style={styles.cardHolderName}>
                          {customer.fullName}
                        </Text>
                      </View>
                      <View style={{ alignItems: 'flex-end' }}>
                        <Text style={styles.cardLimitLabel}>CREDIT LIMIT</Text>
                        <Text style={styles.cardLimitVal}>
                          {card.currency} {card.limit.toLocaleString()}
                        </Text>
                      </View>
                    </View>
                  </View>
                );
              })
            )}

            {/* Omnichannel Communication Dock */}
            <View style={[styles.omnichannelDock, Shadows.card]}>
              <Text style={styles.dockTitle}>Direct Contact Channels</Text>
              <View style={styles.dockChannels}>
                <TouchableOpacity
                  style={styles.dockChannelBtn}
                  onPress={handleCall}
                >
                  <Text style={styles.dockChannelIcon}>📞</Text>
                  <Text style={styles.dockChannelText}>Direct Call</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.dockChannelBtn}
                  onPress={handleChat}
                >
                  <Text style={styles.dockChannelIcon}>💬</Text>
                  <Text style={styles.dockChannelText}>Messenger (99+)</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.dockChannelBtn}
                  onPress={handleEmail}
                >
                  <Text style={styles.dockChannelIcon}>✉️</Text>
                  <Text style={styles.dockChannelText}>Email (99+)</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}

        <View style={{ height: 80 }} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.surfaceBg,
  },
  topBar: {
    backgroundColor: Colors.surfaceCard,
    borderBottomWidth: 1,
    borderBottomColor: Colors.surfaceBorder,
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.xs,
    paddingBottom: Spacing.sm,
  },
  topBarTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.xs,
  },
  backBtn: {
    paddingVertical: 4,
    marginRight: 6,
  },
  backArrow: {
    fontSize: 20,
    color: Colors.textPrimary,
  },
  topBarTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: Colors.textPrimary,
    flex: 1,
  },
  customerCountBadge: {
    backgroundColor: Colors.brandSubtle,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: BorderRadius.full,
    borderWidth: 1,
    borderColor: Colors.brandAccent,
  },
  customerCountText: {
    fontSize: 10,
    fontWeight: '700',
    color: Colors.brandPrimary,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surfaceInput,
    borderRadius: BorderRadius.md,
    paddingHorizontal: Spacing.sm,
    height: 42,
    borderWidth: 1,
    borderColor: Colors.surfaceBorder,
    marginVertical: 4,
  },
  searchIcon: {
    fontSize: 14,
    marginRight: 6,
  },
  searchInput: {
    flex: 1,
    fontSize: 13,
    color: Colors.textPrimary,
    paddingVertical: 0,
  },
  clearSearchIcon: {
    fontSize: 12,
    color: Colors.textMuted,
    paddingHorizontal: 4,
  },
  customerSwitcherContainer: {
    marginTop: 6,
  },
  switcherLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: Colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  switcherContent: {
    gap: 6,
  },
  switcherChip: {
    backgroundColor: Colors.surfaceInput,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: BorderRadius.full,
    borderWidth: 1,
    borderColor: Colors.surfaceBorder,
  },
  switcherChipActive: {
    backgroundColor: Colors.brandSubtle,
    borderColor: Colors.brandPrimary,
  },
  switcherChipText: {
    fontSize: 11,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  switcherChipTextActive: {
    color: Colors.brandPrimary,
    fontWeight: '700',
  },
  searchResultsPanel: {
    backgroundColor: Colors.surfaceCard,
    borderBottomWidth: 2,
    borderBottomColor: Colors.brandPrimary,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    maxHeight: 320,
  },
  searchResultsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.xs,
  },
  searchResultsCount: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.brandDark,
  },
  dismissSearchText: {
    fontSize: 11,
    fontWeight: '600',
    color: Colors.brandPrimary,
  },
  searchResultItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surfaceInput,
    borderRadius: BorderRadius.md,
    padding: Spacing.sm,
    marginVertical: 4,
    borderWidth: 1,
    borderColor: Colors.surfaceBorder,
  },
  resultAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.brandPrimary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.sm,
  },
  resultAvatarText: {
    fontSize: 15,
    fontWeight: '800',
    color: Colors.textInverse,
  },
  resultInfo: {
    flex: 1,
  },
  resultTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  resultName: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  resultTypeBadge: {
    backgroundColor: Colors.brandSubtle,
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: BorderRadius.xs,
  },
  resultTypeText: {
    fontSize: 9,
    fontWeight: '700',
    color: Colors.brandPrimary,
  },
  resultMeta: {
    fontSize: 11,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  resultSub: {
    fontSize: 10,
    color: Colors.textMuted,
    marginTop: 1,
  },
  viewResultBadge: {
    backgroundColor: Colors.brandDark,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: BorderRadius.sm,
    marginLeft: 6,
  },
  viewResultBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.textInverse,
  },
  noResultsBox: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.md,
  },
  noResultsIcon: {
    fontSize: 28,
    marginBottom: 4,
  },
  noResultsTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  noResultsText: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  noResultsHint: {
    fontSize: 11,
    color: Colors.textMuted,
    marginTop: 4,
    textAlign: 'center',
    maxWidth: 260,
  },
  scrollArea: {
    flex: 1,
    padding: Spacing.md,
  },
  profileCard: {
    backgroundColor: Colors.surfaceCard,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.surfaceBorder,
    marginBottom: Spacing.md,
  },
  profileHeader: {
    flexDirection: 'row',
  },
  avatarCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: Colors.brandDark,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
    position: 'relative',
  },
  avatarInitial: {
    color: Colors.textInverse,
    fontSize: 22,
    fontWeight: '800',
  },
  verifiedCheck: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    backgroundColor: Colors.status.converted.text,
    width: 18,
    height: 18,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: Colors.surfaceCard,
  },
  verifiedCheckText: {
    color: Colors.textInverse,
    fontSize: 10,
    fontWeight: '800',
  },
  profileMainInfo: {
    flex: 1,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: 4,
  },
  customerName: {
    fontSize: 16,
    fontWeight: '800',
    color: Colors.textPrimary,
  },
  typeBadge: {
    backgroundColor: Colors.brandSubtle,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: BorderRadius.xs,
  },
  typeBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: Colors.brandPrimary,
  },
  cifPassport: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: 3,
  },
  boldMono: {
    fontWeight: '700',
    fontFamily: 'monospace',
    color: Colors.brandDark,
  },
  demographics: {
    fontSize: 11,
    color: Colors.textMuted,
    marginTop: 2,
  },
  addressText: {
    fontSize: 11,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  commsBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: Spacing.md,
    paddingTop: Spacing.sm,
    borderTopWidth: 1,
    borderTopColor: Colors.surfaceBorder,
  },
  commsButton: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    height: 48,
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.surfaceInput,
    marginHorizontal: 3,
  },
  commsIcon: {
    fontSize: 16,
  },
  commsLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginTop: 2,
  },
  segmentContainer: {
    marginBottom: Spacing.md,
  },
  segmentContent: {
    gap: Spacing.md,
  },
  sectionHeading: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: 2,
  },
  emptyCard: {
    backgroundColor: Colors.surfaceCard,
    padding: Spacing.lg,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.surfaceBorder,
  },
  emptyText: {
    fontSize: 13,
    color: Colors.textMuted,
  },
  accountCard: {
    backgroundColor: Colors.surfaceCard,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.surfaceBorder,
  },
  accountCardSelected: {
    borderColor: Colors.brandPrimary,
    backgroundColor: '#FFFDF9',
  },
  accCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  accNumber: {
    fontSize: 15,
    fontWeight: '700',
    fontFamily: 'monospace',
    color: Colors.brandDark,
  },
  accClass: {
    fontSize: 12,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  accStatusPill: {
    backgroundColor: Colors.status.converted.bg,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: BorderRadius.full,
  },
  accStatusText: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.status.converted.text,
  },
  accBranch: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: 6,
  },
  coOwnersRow: {
    marginTop: 6,
  },
  coOwnersLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: Colors.textMuted,
  },
  coOwnerChips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
    marginTop: 3,
  },
  coOwnerChip: {
    backgroundColor: Colors.surfaceInput,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: BorderRadius.xs,
  },
  coOwnerText: {
    fontSize: 10,
    color: Colors.textSecondary,
  },
  accFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: Spacing.sm,
    paddingTop: Spacing.xs,
    borderTopWidth: 1,
    borderTopColor: Colors.surfaceBorder,
  },
  fdrStatus: {
    fontSize: 11,
    color: Colors.textMuted,
  },
  addTaskBtn: {
    backgroundColor: Colors.brandSubtle,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: BorderRadius.sm,
  },
  addTaskText: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.brandPrimary,
  },
  productsBox: {
    backgroundColor: Colors.surfaceCard,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.surfaceBorder,
  },
  productsBoxTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: Spacing.sm,
  },
  productList: {
    gap: 6,
  },
  productItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
  },
  productStatusIcon: {
    fontSize: 14,
    fontWeight: '800',
    marginRight: 8,
  },
  productActive: {
    color: Colors.status.converted.text,
  },
  productInactive: {
    color: Colors.textMuted,
  },
  productName: {
    fontSize: 13,
    color: Colors.textPrimary,
    flex: 1,
  },
  productNameInactive: {
    color: Colors.textMuted,
    textDecorationLine: 'line-through',
  },
  productStateBadge: {
    fontSize: 11,
    color: Colors.textMuted,
  },
  complianceCard: {
    backgroundColor: Colors.surfaceCard,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.surfaceBorder,
  },
  complianceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  complianceTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  complianceIcon: {
    fontSize: 16,
  },
  complianceTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  accordionArrow: {
    fontSize: 12,
    color: Colors.textMuted,
  },
  complianceBody: {
    marginTop: Spacing.sm,
    paddingTop: Spacing.sm,
    borderTopWidth: 1,
    borderTopColor: Colors.surfaceBorder,
    gap: 6,
  },
  complianceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  complianceLabel: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  kycVerifiedBadge: {
    backgroundColor: Colors.status.converted.bg,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: BorderRadius.xs,
  },
  kycVerifiedText: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.status.converted.text,
  },
  riskRatingText: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.status.converted.text,
  },
  amlText: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  activitySection: {
    backgroundColor: Colors.surfaceCard,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.surfaceBorder,
  },
  activityHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  filterPills: {
    flexDirection: 'row',
    gap: 4,
  },
  actFilterChip: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.surfaceInput,
  },
  actFilterChipActive: {
    backgroundColor: Colors.brandPrimary,
  },
  actFilterText: {
    fontSize: 10,
    color: Colors.textSecondary,
    fontWeight: '600',
  },
  actFilterTextActive: {
    color: Colors.textInverse,
  },
  timelineList: {
    marginTop: Spacing.xs,
  },
  timelineItem: {
    flexDirection: 'row',
  },
  timelineNodeContainer: {
    width: 20,
    alignItems: 'center',
  },
  timelineDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.brandPrimary,
    marginTop: 4,
  },
  timelineLine: {
    width: 2,
    flex: 1,
    backgroundColor: Colors.surfaceBorder,
    marginVertical: 2,
  },
  timelineContent: {
    flex: 1,
    paddingLeft: Spacing.sm,
    paddingBottom: Spacing.md,
  },
  timelineTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  timelineTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  timelineTime: {
    fontSize: 10,
    color: Colors.textMuted,
  },
  timelineDetail: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  timelineComments: {
    fontSize: 11,
    color: Colors.brandDark,
    fontStyle: 'italic',
    marginTop: 2,
  },
  timelineAuthor: {
    fontSize: 10,
    color: Colors.textMuted,
    marginTop: 3,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: Spacing.sm,
  },
  statTile: {
    flex: 1,
    backgroundColor: Colors.surfaceCard,
    padding: Spacing.sm,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.surfaceBorder,
  },
  statVal: {
    fontSize: 16,
    fontWeight: '800',
    color: Colors.brandDark,
  },
  statLabel: {
    fontSize: 10,
    fontWeight: '600',
    color: Colors.textSecondary,
    marginTop: 2,
  },
  statSub: {
    fontSize: 9,
    color: Colors.textMuted,
  },
  // Mobile Banking Tab
  mbHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  mbBadge: {
    backgroundColor: Colors.brandSubtle,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: BorderRadius.xs,
  },
  mbBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: Colors.brandPrimary,
  },
  mbCard: {
    backgroundColor: Colors.surfaceCard,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.surfaceBorder,
  },
  mbCardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  mbAccInfo: {
    flex: 1,
  },
  mbAccNumber: {
    fontSize: 15,
    fontWeight: '700',
    fontFamily: 'monospace',
    color: Colors.brandDark,
  },
  mbBranchText: {
    fontSize: 11,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  pinBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: BorderRadius.full,
  },
  pinBadgeActive: {
    backgroundColor: Colors.status.converted.bg,
  },
  pinBadgeOtp: {
    backgroundColor: Colors.status.warm.bg,
  },
  pinBadgeText: {
    fontSize: 11,
    fontWeight: '700',
  },
  pinTextActive: {
    color: Colors.status.converted.text,
  },
  pinTextOtp: {
    color: Colors.status.warm.text,
  },
  mbCardDivider: {
    height: 1,
    backgroundColor: Colors.surfaceBorder,
    marginVertical: Spacing.sm,
  },
  mbCardBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  mbMetaText: {
    fontSize: 11,
    color: Colors.textMuted,
  },
  mbResetPinBtn: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  mbResetPinText: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.brandPrimary,
  },
  // Bancassurance Tab
  policyCard: {
    backgroundColor: Colors.surfaceCard,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.surfaceBorder,
  },
  policyCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  policyLineTag: {
    backgroundColor: Colors.brandSubtle,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: BorderRadius.xs,
  },
  policyLineText: {
    fontSize: 10,
    fontWeight: '700',
    color: Colors.brandPrimary,
  },
  ipenTag: {
    backgroundColor: Colors.status.converted.bg,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: BorderRadius.xs,
  },
  ipenText: {
    fontSize: 10,
    fontWeight: '700',
    color: Colors.status.converted.text,
  },
  policyNumber: {
    fontSize: 14,
    fontWeight: '700',
    fontFamily: 'monospace',
    color: Colors.brandDark,
  },
  policyProductName: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  policyFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: Spacing.sm,
    paddingTop: Spacing.xs,
    borderTopWidth: 1,
    borderTopColor: Colors.surfaceBorder,
  },
  policyExpiry: {
    fontSize: 11,
    color: Colors.textMuted,
  },
  renewPolicyBtn: {
    backgroundColor: Colors.brandPrimary,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: BorderRadius.sm,
  },
  renewPolicyText: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.textInverse,
  },
  // Credit Cards Tab
  creditCardVisual: {
    borderRadius: BorderRadius.xl,
    padding: Spacing.lg,
    minHeight: 180,
    justifyContent: 'space-between',
    marginBottom: Spacing.md,
  },
  cardNavyBg: {
    backgroundColor: '#0F172A',
  },
  cardDeepBlueBg: {
    backgroundColor: '#1E3A8A',
  },
  creditCardTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bankBrand: {
    fontSize: 16,
    fontWeight: '800',
    color: '#F8FAFC',
    letterSpacing: 1,
  },
  cardStatusTag: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: BorderRadius.full,
  },
  cardStatusNormal: {
    backgroundColor: 'rgba(34, 197, 94, 0.25)',
  },
  cardStatusReplaced: {
    backgroundColor: 'rgba(234, 179, 8, 0.35)',
  },
  cardStatusTagText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#F8FAFC',
  },
  chipGraphic: {
    width: 38,
    height: 28,
    borderRadius: 4,
    backgroundColor: '#D97706',
    padding: 3,
    justifyContent: 'space-around',
    marginVertical: Spacing.xs,
  },
  chipLine: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
  },
  maskedPanText: {
    fontSize: 18,
    fontWeight: '700',
    fontFamily: 'monospace',
    color: '#FFFFFF',
    letterSpacing: 2,
    marginVertical: 4,
  },
  creditCardBottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  cardHolderLabel: {
    fontSize: 9,
    color: '#94A3B8',
    letterSpacing: 0.5,
  },
  cardHolderName: {
    fontSize: 12,
    fontWeight: '700',
    color: '#F8FAFC',
  },
  cardLimitLabel: {
    fontSize: 9,
    color: '#94A3B8',
    letterSpacing: 0.5,
  },
  cardLimitVal: {
    fontSize: 13,
    fontWeight: '800',
    color: '#F8FAFC',
  },
  omnichannelDock: {
    backgroundColor: Colors.surfaceCard,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.surfaceBorder,
  },
  dockTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: Spacing.sm,
  },
  dockChannels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 6,
  },
  dockChannelBtn: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: Colors.surfaceInput,
    borderRadius: BorderRadius.md,
  },
  dockChannelIcon: {
    fontSize: 18,
  },
  dockChannelText: {
    fontSize: 10,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginTop: 4,
    textAlign: 'center',
  },
});
