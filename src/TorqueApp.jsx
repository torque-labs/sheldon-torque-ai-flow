import React, { useState } from 'react';
import {
  Shield, Zap, TrendingUp, TrendingDown, Send, AlertTriangle,
  ChevronRight, ChevronDown, ArrowUpRight, ArrowDownRight,
  Sparkles, Clock, Target, Users, BarChart2, Activity,
  MessageSquare, Plus, Search, Settings, LayoutDashboard,
  Gift, HelpCircle, Wallet, ExternalLink, History,
  Layers, Play, Pause, ChevronUp, X, RefreshCw,
  Filter, Download, Check, ChevronLeft, Copy,
  Minus, MoreHorizontal, Eye, Share2, Bell, FileText,
  Mail, Link, Lightbulb, Edit3, BarChart, UserX, Rocket, Trophy, Upload
} from 'lucide-react';

// ============================================
// SHARED COMPONENTS
// ============================================

// Torque Logo icon
const TorqueLogo = ({ className }) => (
  <svg className={className} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M22.5871 2H9.41337C8.48752 2 7.63199 2.49394 7.16906 3.29577L0.58254 14.7041C0.119628 15.5059 0.119621 16.4937 0.582525 17.2955L7.16907 28.7042C7.63199 29.506 8.48752 30 9.4134 30H22.5871C23.513 30 24.3685 29.506 24.8314 28.7042L31.418 17.2955C31.8809 16.4937 31.8809 15.5059 31.4179 14.7041L24.8314 3.29577C24.3685 2.49395 23.513 2 22.5871 2ZM17.6833 16.9716H29.3608L23.5223 27.0847L17.6833 16.9716ZM29.3608 15.0281H18.0574C17.1315 15.0281 16.276 14.5341 15.8131 13.7323L10.1613 3.94352H21.465C22.3909 3.94352 23.2464 4.43746 23.7093 5.23929L29.3608 15.0281ZM14.317 15.0281H2.63966L8.47822 4.91526L14.317 15.0281ZM2.63964 16.9716H13.9429C14.8688 16.9716 15.7243 17.4655 16.1872 18.2673L21.8391 28.0565H10.5355C9.6096 28.0565 8.75407 27.5625 8.29115 26.7607L2.63964 16.9716Z" fill="currentColor"/>
  </svg>
);

// Sparkline component
const Sparkline = ({ data, color = 'violet', trend }) => {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const width = 80;
  const height = 24;
  const padding = 2;

  const points = data.map((value, i) => {
    const x = padding + (i / (data.length - 1)) * (width - padding * 2);
    const y = height - padding - ((value - min) / range) * (height - padding * 2);
    return `${x},${y}`;
  }).join(' ');

  const colors = {
    emerald: { stroke: '#10b981', fill: 'rgba(16, 185, 129, 0.1)' },
    red: { stroke: '#ef4444', fill: 'rgba(239, 68, 68, 0.1)' },
    violet: { stroke: '#8b5cf6', fill: 'rgba(139, 92, 246, 0.1)' },
    amber: { stroke: '#f59e0b', fill: 'rgba(245, 158, 11, 0.1)' },
    gray: { stroke: '#9ca3af', fill: 'rgba(156, 163, 175, 0.1)' }
  };

  const lineColor = trend === 'up' ? colors.emerald : trend === 'down' ? colors.red : colors[color] || colors.gray;

  const firstPoint = points.split(' ')[0];
  const lastPoint = points.split(' ').pop();
  const areaPath = `M ${firstPoint.split(',')[0]},${height - padding} L ${points} L ${lastPoint.split(',')[0]},${height - padding} Z`;

  return (
    <svg width={width} height={height} className="overflow-visible">
      <path d={areaPath} fill={lineColor.fill} />
      <polyline
        points={points}
        fill="none"
        stroke={lineColor.stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle
        cx={parseFloat(lastPoint.split(',')[0])}
        cy={parseFloat(lastPoint.split(',')[1])}
        r="2.5"
        fill={lineColor.stroke}
      />
    </svg>
  );
};

// Mini sparkline for table rows
const MiniSparkline = ({ data, color = 'gray' }) => {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const width = 60;
  const height = 20;

  const points = data.map((value, i) => {
    const x = (i / (data.length - 1)) * width;
    const y = height - ((value - min) / range) * height;
    return `${x},${y}`;
  }).join(' ');

  const colors = {
    green: '#10b981',
    red: '#ef4444',
    gray: '#9ca3af',
    amber: '#f59e0b'
  };

  return (
    <svg width={width} height={height} className="overflow-visible">
      <polyline
        points={points}
        fill="none"
        stroke={colors[color]}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

// Time period selector
const TimePeriodSelector = ({ selected, onChange }) => {
  const periods = ['7d', '30d', '90d'];
  return (
    <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
      {periods.map(period => (
        <button
          key={period}
          onClick={() => onChange(period)}
          className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
            selected === period
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          {period}
        </button>
      ))}
    </div>
  );
};

// Health badge
const HealthBadge = ({ status }) => {
  const config = {
    'at-risk': { color: 'bg-red-100 text-red-700 border-red-200', label: 'At Risk', dot: 'bg-red-500' },
    'healthy': { color: 'bg-emerald-100 text-emerald-700 border-emerald-200', label: 'Healthy', dot: 'bg-emerald-500' },
    'new': { color: 'bg-blue-100 text-blue-700 border-blue-200', label: 'New', dot: 'bg-blue-500' },
    'churned': { color: 'bg-gray-100 text-gray-600 border-gray-200', label: 'Churned', dot: 'bg-gray-400' },
    'rising': { color: 'bg-violet-100 text-violet-700 border-violet-200', label: 'Rising', dot: 'bg-violet-500' }
  };

  const { color, label, dot } = config[status] || config.healthy;

  return (
    <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium border ${color}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${dot}`} />
      {label}
    </span>
  );
};

// Segment tag
const SegmentTag = ({ name, icon }) => {
  const icons = {
    whale: '🐋',
    rising: '⭐',
    loyal: '💎',
    new: '🆕',
    lp: '💧'
  };

  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-gray-100 rounded text-xs text-gray-600">
      <span>{icons[icon] || '📌'}</span>
      {name}
    </span>
  );
};

// ============================================
// HOME VIEW COMPONENTS
// ============================================

// Protocol metric card
const ProtocolMetricCard = ({ icon: Icon, label, value, subtitle, change, changeLabel, sparklineData, trend, onAskAI }) => (
  <div className="bg-gray-50 rounded-xl px-4 py-3 border border-gray-200 transition-all text-left group">
    <div className="flex items-center justify-between mb-1">
      <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">{label}</span>
      <button
        onClick={onAskAI}
        className="p-1.5 text-violet-500 hover:text-violet-700 hover:bg-violet-100 rounded-lg transition-colors"
        title="Analyze with AI"
      >
        <TorqueLogo className="w-4 h-4" />
      </button>
    </div>
    <div className="flex items-center justify-between">
      <div>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold text-gray-900">{value}</span>
          <span className={`text-xs font-medium flex items-center ${
            trend === 'up' ? 'text-emerald-600' : trend === 'down' ? 'text-red-600' : 'text-gray-500'
          }`}>
            {trend === 'up' ? <ArrowUpRight className="w-3 h-3" /> : trend === 'down' ? <ArrowDownRight className="w-3 h-3" /> : null}
            {change}
          </span>
        </div>
        {subtitle && <span className="text-sm font-medium text-gray-600">{subtitle}</span>}
        <span className="text-xs text-gray-400 block">{changeLabel}</span>
      </div>
      <Sparkline data={sparklineData} trend={trend} />
    </div>
  </div>
);

// Metric detail modal
const MetricDetailModal = ({ metric, onClose, onAskAI }) => {
  if (!metric) return null;

  const detailData = {
    'Total Users': {
      breakdown: [
        { label: 'New this period', value: '2,412', change: '+18%' },
        { label: 'Returning', value: '45,788', change: '+2%' },
        { label: 'Churned', value: '892', change: '-12%' }
      ],
      insights: 'User acquisition is strong but churn rate increased 12% — consider retention campaign for at-risk users.',
      aiQuestion: 'Why is user churn increasing and who are the users most at risk?'
    },
    'Weekly Volume': {
      breakdown: [
        { label: 'Swaps', value: '$8.2M', change: '-5%' },
        { label: 'Liquidity Adds', value: '$3.1M', change: '-15%' },
        { label: 'Liquidity Removes', value: '$1.5M', change: '+22%' }
      ],
      insights: 'Volume decline driven by LP withdrawals. 3 whale LPs removed $890K this week.',
      aiQuestion: 'Which users are driving the volume decline and what can we do about it?'
    },
    'Weekly Fees': {
      breakdown: [
        { label: 'Swap Fees', value: '$28.4K', change: '-8%' },
        { label: 'LP Fees', value: '$7.2K', change: '-18%' },
        { label: 'Protocol Fees', value: '$2.8K', change: '-15%' }
      ],
      insights: 'Fee decline correlates with volume drop. LP fee reduction most significant.',
      aiQuestion: 'How can we recover the fee revenue we\'re losing?'
    },
    'Active Users': {
      breakdown: [
        { label: 'Daily Active', value: '1,247', change: '+5%' },
        { label: 'Weekly Active', value: '4,175', change: '+4%' },
        { label: 'Monthly Active', value: '12,892', change: '-2%' }
      ],
      insights: 'Daily engagement improving but monthly cohort shrinking — early churn signal.',
      aiQuestion: 'Show me users who were active last month but not this week'
    }
  };

  const data = detailData[metric.label] || { breakdown: [], insights: '', aiQuestion: '' };

  const handleAskAI = () => {
    onAskAI(data.aiQuestion);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-white rounded-2xl w-full max-w-lg mx-4 overflow-hidden shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-violet-100 flex items-center justify-center">
              <metric.icon className="w-5 h-5 text-violet-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">{metric.label}</h3>
              <p className="text-sm text-gray-500">{metric.changeLabel}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        <div className="px-6 py-4">
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="text-4xl font-bold text-gray-900">{metric.value}</div>
              <span className={`text-sm font-medium flex items-center mt-1 ${
                metric.trend === 'up' ? 'text-emerald-600' : metric.trend === 'down' ? 'text-red-600' : 'text-gray-500'
              }`}>
                {metric.trend === 'up' ? <ArrowUpRight className="w-4 h-4" /> : metric.trend === 'down' ? <ArrowDownRight className="w-4 h-4" /> : null}
                {metric.change} vs previous period
              </span>
            </div>
            <div className="scale-150 origin-right">
              <Sparkline data={metric.sparklineData} trend={metric.trend} />
            </div>
          </div>

          <div className="space-y-3 mb-6">
            <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Breakdown</h4>
            {data.breakdown.map((item, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                <span className="text-sm text-gray-600">{item.label}</span>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-semibold text-gray-900">{item.value}</span>
                  <span className={`text-xs font-medium ${
                    item.change.startsWith('+') ? 'text-emerald-600' : 'text-red-600'
                  }`}>{item.change}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-violet-50 border border-violet-200 rounded-xl px-4 py-3">
            <div className="flex items-start gap-3">
              <Sparkles className="w-4 h-4 text-violet-600 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-violet-800">{data.insights}</p>
            </div>
          </div>
        </div>

        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex gap-3">
          <button
            onClick={handleAskAI}
            className="flex-1 py-2.5 px-4 bg-violet-600 hover:bg-violet-700 text-white text-sm font-semibold rounded-xl transition-colors flex items-center justify-center gap-2"
          >
            <MessageSquare className="w-4 h-4" />
            Ask AI About This
          </button>
          <button className="py-2.5 px-4 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 text-sm font-semibold rounded-xl transition-colors">
            Export
          </button>
        </div>
      </div>
    </div>
  );
};

// Save Segment Modal
const SaveSegmentModal = ({ onClose, onSave, segmentName, setSegmentName }) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-white rounded-2xl w-full max-w-md mx-4 overflow-hidden shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="px-6 py-4 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-violet-100 flex items-center justify-center">
              <Layers className="w-5 h-5 text-violet-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Save as Segment</h3>
              <p className="text-sm text-gray-500">Create a reusable audience segment</p>
            </div>
          </div>
        </div>

        <div className="px-6 py-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Segment Name</label>
            <input
              type="text"
              value={segmentName}
              onChange={(e) => setSegmentName(e.target.value)}
              placeholder="e.g., At-Risk Whales Q1"
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
            />
          </div>

          <div className="bg-gray-50 rounded-xl p-4">
            <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Segment Preview</h4>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Users</span>
                <span className="font-semibold text-gray-900">12</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Total Volume</span>
                <span className="font-semibold text-gray-900">$890K</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Criteria</span>
                <span className="font-medium text-violet-600">Top 5%, -30% activity</span>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Auto-refresh</label>
            <select className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent bg-white">
              <option>Daily</option>
              <option>Weekly</option>
              <option>Manual only</option>
            </select>
          </div>
        </div>

        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex gap-3">
          <button
            onClick={() => onSave(segmentName)}
            disabled={!segmentName.trim()}
            className="flex-1 py-2.5 px-4 bg-violet-600 hover:bg-violet-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white text-sm font-semibold rounded-xl transition-colors flex items-center justify-center gap-2"
          >
            <Layers className="w-4 h-4" />
            Save Segment
          </button>
          <button
            onClick={onClose}
            className="py-2.5 px-4 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 text-sm font-semibold rounded-xl transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

// Create Campaign Modal
const CreateCampaignModal = ({ onClose, onCreate }) => {
  const [campaignName, setCampaignName] = useState('');
  const [rewardType, setRewardType] = useState('tokens');
  const [rewardAmount, setRewardAmount] = useState('');
  const [duration, setDuration] = useState('7');

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-white rounded-2xl w-full max-w-lg mx-4 overflow-hidden shadow-2xl max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        <div className="px-6 py-4 border-b border-gray-100 sticky top-0 bg-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center">
              <Gift className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Create Campaign</h3>
              <p className="text-sm text-gray-500">Launch a retention incentive</p>
            </div>
          </div>
        </div>

        <div className="px-6 py-4 space-y-4">
          <div className="bg-violet-50 border border-violet-200 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Users className="w-4 h-4 text-violet-600" />
              <span className="text-sm font-semibold text-violet-800">Target Audience</span>
            </div>
            <p className="text-sm text-violet-700">12 users • $890K at risk</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Campaign Name</label>
            <input
              type="text"
              value={campaignName}
              onChange={(e) => setCampaignName(e.target.value)}
              placeholder="e.g., Whale Retention Boost"
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Reward Type</label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'tokens', label: 'Tokens', icon: Wallet },
                { id: 'fee_rebate', label: 'Fee Rebate', icon: TrendingUp },
                { id: 'nft', label: 'NFT', icon: Gift }
              ].map(type => (
                <button
                  key={type.id}
                  onClick={() => setRewardType(type.id)}
                  className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border transition-all ${
                    rewardType === type.id
                      ? 'border-violet-500 bg-violet-50 text-violet-700'
                      : 'border-gray-200 hover:border-gray-300 text-gray-600'
                  }`}
                >
                  <type.icon className="w-5 h-5" />
                  <span className="text-xs font-medium">{type.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              {rewardType === 'tokens' ? 'Token Amount per User' : rewardType === 'fee_rebate' ? 'Rebate Percentage' : 'NFT Collection'}
            </label>
            <input
              type="text"
              value={rewardAmount}
              onChange={(e) => setRewardAmount(e.target.value)}
              placeholder={rewardType === 'tokens' ? '100 TORQ' : rewardType === 'fee_rebate' ? '50%' : 'Collection address'}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Campaign Duration</label>
            <select
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent bg-white"
            >
              <option value="7">7 days</option>
              <option value="14">14 days</option>
              <option value="30">30 days</option>
              <option value="90">90 days</option>
            </select>
          </div>

          <div className="bg-gray-50 rounded-xl p-4">
            <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Estimated Impact</h4>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-lg font-bold text-emerald-600">+$340K</div>
                <div className="text-xs text-gray-500">Recovered Volume</div>
              </div>
              <div>
                <div className="text-lg font-bold text-violet-600">8/12</div>
                <div className="text-xs text-gray-500">Users Retained</div>
              </div>
              <div>
                <div className="text-lg font-bold text-amber-600">2.4x</div>
                <div className="text-xs text-gray-500">Est. ROI</div>
              </div>
            </div>
          </div>
        </div>

        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex gap-3 sticky bottom-0">
          <button
            onClick={() => onCreate({ name: campaignName, rewardType, rewardAmount, duration })}
            disabled={!campaignName.trim() || !rewardAmount.trim()}
            className="flex-1 py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white text-sm font-semibold rounded-xl transition-colors flex items-center justify-center gap-2"
          >
            <Play className="w-4 h-4" />
            Launch Campaign
          </button>
          <button
            onClick={onClose}
            className="py-2.5 px-4 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 text-sm font-semibold rounded-xl transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

// Recipe Icon Components
const RecipeIcon = ({ type, className = "w-6 h-6" }) => {
  const icons = {
    'accumulation': (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M2 20h20M5 20V10l7-7 7 7v10M9 20v-6h6v6" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    'lottery': (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="3" width="18" height="18" rx="2" strokeLinecap="round"/>
        <path d="M3 9h18M9 3v18" strokeLinecap="round"/>
      </svg>
    ),
    'volume': (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    'streak': (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    'early-bird': (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="10"/>
        <path d="M12 6v6l4 2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    'leaderboard': (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M8 21V11M16 21V7M12 21V3" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    'holder': (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="10"/>
        <path d="M12 6v12M6 12h12" strokeLinecap="round"/>
      </svg>
    ),
    'lp': (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2a10 10 0 1 0 10 10" strokeLinecap="round"/>
        <path d="M12 12l7-7M16 5h3v3" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    'referral': (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="9" cy="7" r="4"/>
        <path d="M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75M21 21v-2a4 4 0 0 0-3-3.87" strokeLinecap="round"/>
      </svg>
    ),
  };
  return icons[type] || icons['volume'];
};

// Create Incentive Modal - Recipe-based with Segment Selection
const CreateIncentiveModal = ({ onClose, onCreate }) => {
  // Flow state: 'recipes' | 'configure' | 'success'
  const [flowStep, setFlowStep] = useState('recipes');
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [activeCategory, setActiveCategory] = useState('trading');
  const [launchedIncentive, setLaunchedIncentive] = useState(null);

  // Configuration wizard step: 1=Configure, 2=Audience, 3=Review
  const [configStep, setConfigStep] = useState(1);

  // Configuration state
  const [incentiveName, setIncentiveName] = useState('');
  const [description, setDescription] = useState('');
  const [launchType, setLaunchType] = useState('recurring');
  const [duration, setDuration] = useState('14');
  const [frequency, setFrequency] = useState('weekly');

  // Audience state
  const [selectedAudience, setSelectedAudience] = useState(null);
  const [showAudienceDropdown, setShowAudienceDropdown] = useState(false);
  const [audienceType, setAudienceType] = useState('all'); // 'all' or 'segment'
  const [selectedEligibility, setSelectedEligibility] = useState(null);
  const [showEligibilityDropdown, setShowEligibilityDropdown] = useState(false);
  const [eligibilityMode, setEligibilityMode] = useState('pinned');

  // Build Your Own state
  const [selectedRewardType, setSelectedRewardType] = useState(null);
  const [byoStep, setByoStep] = useState(1); // 1=Config, 2=Audience, 3=Distribution, 4=Confirm

  // BYO Configuration state
  const [campaign, setCampaign] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [distributionMethod, setDistributionMethod] = useState('claim');
  const [claimWindowStart, setClaimWindowStart] = useState('15:00');
  const [claimWindowDuration, setClaimWindowDuration] = useState('24');
  const [timezoneOffset, setTimezoneOffset] = useState('-5');

  // BYO Audience state
  const [selectedQuery, setSelectedQuery] = useState(null);
  const [addressColumn, setAddressColumn] = useState('');
  const [metricColumn, setMetricColumn] = useState('');

  // BYO Distribution state
  const [rewardToken, setRewardToken] = useState('USDC');
  const [totalRewardPool, setTotalRewardPool] = useState('10000');
  const [distributionPreset, setDistributionPreset] = useState('base');
  const [distributionConfigMethod, setDistributionConfigMethod] = useState('manual');
  const [valueType, setValueType] = useState('percentage');
  const [orderingMode, setOrderingMode] = useState('tier');
  const [rankAllocations, setRankAllocations] = useState([
    { from: 1, to: 1, value: 20.08 },
    { from: 2, to: 2, value: 12 },
    { from: 3, to: 3, value: 8.5 },
    { from: 4, to: 4, value: 6.5 },
    { from: 5, to: 5, value: 5 },
    { from: 6, to: 6, value: 4 },
    { from: 7, to: 7, value: 3.2 },
    { from: 8, to: 8, value: 2.6 },
    { from: 9, to: 9, value: 2.1 },
    { from: 10, to: 10, value: 1.8 },
  ]);

  // Recipe categories
  const categories = [
    { id: 'trading', label: 'TRADING' },
    { id: 'holding', label: 'HOLDING' },
    { id: 'liquidity', label: 'LIQUIDITY' },
    { id: 'referrals', label: 'REFERRALS' },
  ];

  // Recipe data
  const recipes = [
    // Trading
    { id: 'accumulation', name: 'Accumulation Bonus', description: 'Bonus rewards for net positive token accumulation.', category: 'trading', reward: 'Rebate', icon: 'accumulation', tags: ['Trading Activity', 'Encourages Holding'] },
    { id: 'lottery', name: 'Random Buy Multiplier Lottery', description: 'Buyers get lottery tickets based on purchase amount.', category: 'trading', reward: 'Raffle', icon: 'lottery', tags: ['Randomized Rewards', 'Trading Activity'] },
    { id: 'volume-warrior', name: 'Volume Warrior', description: 'Rewards traders based on volume + consistency.', category: 'trading', reward: 'Rebate', icon: 'volume', tags: ['Trading Activity', 'Volume', 'Daily Engagement'] },
    { id: 'lucky-streak', name: 'Lucky Streak', description: 'Exponential rewards for consecutive daily buys.', category: 'trading', reward: 'Rebate', icon: 'streak', tags: ['Trading Activity', 'Encourages Buying', 'Streak'] },
    { id: 'early-bird', name: 'Early Bird', description: 'Reward early adopters with higher multipliers based on when they make their first purchase.', category: 'trading', reward: 'Rebate', icon: 'early-bird', tags: ['Trading Activity', 'Encourages Buying', 'Proportional'] },
    { id: 'high-volume', name: 'High Volume Trader Rewards', description: 'Competitive rewards for top traders by volume.', category: 'trading', reward: 'Leaderboard', icon: 'leaderboard', tags: ['Trading Activity', 'Volume', 'Proportional'] },
    // Holding
    { id: 'diamond-hands', name: 'Diamond Hands', description: 'Reward users who hold tokens for extended periods.', category: 'holding', reward: 'Rebate', icon: 'holder', tags: ['Holding', 'Time-based'] },
    { id: 'holder-tiers', name: 'Holder Tiers', description: 'Tiered rewards based on token balance thresholds.', category: 'holding', reward: 'Rebate', icon: 'holder', tags: ['Holding', 'Balance-based'] },
    // Liquidity
    { id: 'lp-rewards', name: 'LP Provider Rewards', description: 'Incentivize liquidity provision with bonus rewards.', category: 'liquidity', reward: 'Rebate', icon: 'lp', tags: ['Liquidity', 'LP Providers'] },
    { id: 'lp-loyalty', name: 'LP Loyalty Program', description: 'Long-term rewards for consistent LP providers.', category: 'liquidity', reward: 'Leaderboard', icon: 'lp', tags: ['Liquidity', 'Time-based'] },
    // Referrals
    { id: 'referral-bonus', name: 'Referral Bonus', description: 'Reward users for bringing new traders to the platform.', category: 'referrals', reward: 'Rebate', icon: 'referral', tags: ['Referrals', 'New Users'] },
    { id: 'referral-tiers', name: 'Referral Leaderboard', description: 'Competitive rewards for top referrers.', category: 'referrals', reward: 'Leaderboard', icon: 'referral', tags: ['Referrals', 'Competitive'] },
  ];

  // Reward types for Build Your Own
  const rewardTypes = [
    { id: 'leaderboard', name: 'Leaderboard', description: 'Reward token holders based on holding duration and amount with linear or tiered bonus structures' },
    { id: 'rebate', name: 'Rebate', description: 'Percentage based rewards on your metric' },
    { id: 'raffle', name: 'Raffle', description: 'Randomly reward users' },
    { id: 'direct', name: 'Direct', description: 'Quickly distribute tokens to an existing audience list' },
  ];

  // Available tokens for rewards
  const rewardTokens = [
    { id: 'usdc', name: 'USDC', icon: '💵' },
    { id: 'usdt', name: 'USDT', icon: '💴' },
    { id: 'sol', name: 'SOL', icon: '◎' },
  ];

  // Eligibility segments - defines WHO can qualify for rewards
  const eligibilitySegments = [
    {
      id: 'verified-traders',
      name: 'Verified Traders',
      description: 'Users who have completed trading verification',
      walletCount: 1247,
    },
    {
      id: 'token-holders',
      name: 'TORQ Token Holders',
      description: 'Users holding at least 100 TORQ tokens',
      walletCount: 2340,
    },
    {
      id: 'loyalty-members',
      name: 'Loyalty Program Members',
      description: 'Users enrolled in the loyalty program',
      walletCount: 892,
    },
  ];

  // Audience queries - defines the DATA SOURCE for calculating reward distribution
  const audienceQueries = [
    {
      id: 'trading-volume',
      name: 'Trading Volume (30d)',
      description: 'Rank users by their 30-day trading volume',
      addressColumn: 'wallet',
      metricColumn: 'volume_30d',
      userCount: 4521,
      preview: [
        { address: 'CyaETVxvBrahnPWkqm5VsdCryS2QmNht2UFhLJHga54o', metric: 125000 },
        { address: '6pkPgzDBLeNbalDB6DYAQzFHtvCMkLVscyyl4E5NcyY', metric: 98500 },
        { address: 'CA4kekXL5GJWBcsWIvjtMFBghQ8pFsGRWFxLHCtrzu5', metric: 87200 },
      ]
    },
    {
      id: 'pnl-performance',
      name: 'PnL Performance',
      description: 'Rank users by their profit and loss',
      addressColumn: 'feePayer',
      metricColumn: 'total_pnl',
      userCount: 3892,
      preview: [
        { address: '7f3a8b2c...4d9e', metric: 40415.85 },
        { address: '9a2c1b4e...8f3d', metric: 17514.67 },
        { address: '3b7f9d1a...2c8e', metric: 13006.37 },
      ]
    },
    {
      id: 'activity-score',
      name: 'Activity Score',
      description: 'Rank users by engagement and activity metrics',
      addressColumn: 'wallet',
      metricColumn: 'activity_score',
      userCount: 5678,
      preview: [
        { address: '4c1a7e3d...9b2f', metric: 9850 },
        { address: '6b8f2a9c...1d7e', metric: 8720 },
        { address: '8e5d1c7b...3a9f', metric: 7640 },
      ]
    },
  ];

  const filteredRecipes = recipes.filter(r => r.category === activeCategory);
  const selectedAudienceData = audienceQueries.find(a => a.id === selectedAudience);
  const selectedEligibilityData = eligibilitySegments.find(s => s.id === selectedEligibility);

  const formatNumber = (num) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(2)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(2)}K`;
    return num.toLocaleString();
  };

  const handleSelectRecipe = (recipe) => {
    setSelectedRecipe(recipe);
    setIncentiveName(recipe.name);
    setFlowStep('configure');
    setConfigStep(1);
  };

  const handleBack = () => {
    if (flowStep === 'configure') {
      if (configStep > 1) {
        setConfigStep(configStep - 1);
      } else {
        setFlowStep('recipes');
        setSelectedRecipe(null);
        setConfigStep(1);
      }
    }
  };

  const handleContinue = () => {
    if (configStep < 2) {
      setConfigStep(configStep + 1);
    } else {
      // Show success screen
      const incentive = {
        recipe: selectedRecipe,
        name: incentiveName,
        description,
        launchType,
        duration,
        frequency,
        audience: selectedAudienceData,
        eligibilityMode,
      };
      setLaunchedIncentive(incentive);
      setFlowStep('success');
      // Auto-redirect after 2 seconds
      setTimeout(() => {
        onCreate(incentive);
      }, 2000);
    }
  };

  const canContinue = () => {
    if (configStep === 1) return incentiveName.trim().length > 0;
    return true;
  };

  // Render recipe selection
  // Render success screen
  if (flowStep === 'success') {
    return (
      <div className="fixed inset-0 bg-gray-50 z-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-100 flex items-center justify-center">
            <Check className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Incentive Launched!</h1>
          <p className="text-gray-500 mb-2">
            "{launchedIncentive?.name}" has been successfully created.
          </p>
          <p className="text-sm text-gray-400">Redirecting to home...</p>
        </div>
      </div>
    );
  }

  if (flowStep === 'recipes') {
    return (
      <div className="fixed inset-0 bg-gray-50 z-50 overflow-auto">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
          <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-violet-100 flex items-center justify-center">
                <Gift className="w-4 h-4 text-violet-600" />
              </div>
              <span className="text-lg font-semibold text-gray-900">Create Incentive</span>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>
        </header>

        {/* Content */}
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-gray-900 italic mb-2">Launch Your Campaign</h1>
            <p className="text-gray-500">Choose a pre-configured recipe or build your own.</p>
          </div>

          {/* Category Tabs */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex border-b border-gray-200">
              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-8 py-3 text-sm font-medium transition-colors relative ${
                    activeCategory === cat.id
                      ? 'text-gray-900'
                      : 'text-gray-400 hover:text-gray-600'
                  }`}
                >
                  {cat.label}
                  {activeCategory === cat.id && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Recipe Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
            {filteredRecipes.map(recipe => (
              <button
                key={recipe.id}
                onClick={() => handleSelectRecipe(recipe)}
                className="bg-white rounded-xl border border-gray-200 p-5 text-left hover:border-violet-300 hover:shadow-md transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-violet-50 flex items-center justify-center mb-4 group-hover:bg-violet-100 transition-colors">
                  <RecipeIcon type={recipe.icon} className="w-6 h-6 text-violet-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">{recipe.name}</h3>
                <p className="text-sm text-gray-500 mb-3 line-clamp-2">{recipe.description}</p>
                <div className="mb-3">
                  <span className="text-xs text-gray-400 uppercase tracking-wide">REWARD</span>
                  <p className="text-sm font-medium text-gray-900">{recipe.reward}</p>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {recipe.tags.map(tag => (
                    <span key={tag} className="px-2 py-0.5 bg-gray-100 rounded text-xs text-gray-600">
                      {tag}
                    </span>
                  ))}
                </div>
              </button>
            ))}
          </div>

          {/* Build from scratch */}
          <div className="text-center">
            <span className="text-gray-400">+</span>
            <span className="text-gray-500 ml-2">Want full control?</span>
            <button
              onClick={() => {
                setFlowStep('build-your-own');
                setIncentiveName('');
                setSelectedRewardType(null);
                setAudienceType('all');
                setSelectedAudience(null);
              }}
              className="text-gray-900 font-medium ml-1 underline hover:text-violet-600 transition-colors"
            >
              Build from scratch
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Render Build Your Own - Select Reward Type page
  if (flowStep === 'build-your-own' && !selectedRewardType) {
    return (
      <div className="fixed inset-0 bg-gray-100 z-50 overflow-auto">
        {/* Back link */}
        <div className="max-w-4xl mx-auto px-6 py-6">
          <button
            onClick={() => setFlowStep('recipes')}
            className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to Create Incentive
          </button>
        </div>

        {/* Content */}
        <div className="max-w-3xl mx-auto px-6 py-8">
          <div className="text-center mb-10">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Select Reward Type</h1>
            <p className="text-gray-500">Choose how you want to distribute rewards to your audience</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {rewardTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => {
                  setSelectedRewardType(type);
                  setByoStep(1);
                }}
                className="bg-white p-6 rounded-xl border border-gray-200 text-left hover:border-violet-300 hover:shadow-sm transition-all"
              >
                <div className="w-10 h-10 rounded-lg bg-violet-50 flex items-center justify-center mb-4">
                  {type.id === 'leaderboard' && <Trophy className="w-5 h-5 text-violet-500" />}
                  {type.id === 'rebate' && <span className="text-violet-500 font-bold">%</span>}
                  {type.id === 'raffle' && <Gift className="w-5 h-5 text-violet-500" />}
                  {type.id === 'direct' && <Zap className="w-5 h-5 text-violet-500" />}
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">{type.name}</h3>
                <p className="text-sm text-gray-500">{type.description}</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Render Build Your Own - Configuration wizard
  if (flowStep === 'build-your-own' && selectedRewardType) {
    const buildSteps = [
      { num: 1, label: 'Configuration' },
      { num: 2, label: 'Audience' },
      { num: 3, label: 'Distribution Rules' },
      { num: 4, label: 'Confirmation' },
    ];

    const selectedQueryData = audienceQueries.find(q => q.id === selectedQuery);

    const handleByoBack = () => {
      if (byoStep === 1) {
        setSelectedRewardType(null);
      } else {
        setByoStep(byoStep - 1);
      }
    };

    const handleByoContinue = () => {
      if (byoStep < 4) {
        setByoStep(byoStep + 1);
      } else {
        // Show success screen
        const incentive = {
          type: 'custom',
          rewardType: selectedRewardType,
          name: incentiveName,
          description,
          launchType,
          startDate,
          endDate,
          frequency,
          distributionMethod,
          claimWindowStart,
          claimWindowDuration,
          timezoneOffset,
          audience: selectedQueryData,
          addressColumn,
          metricColumn,
          rewardToken,
          totalRewardPool,
          rankAllocations,
        };
        setLaunchedIncentive(incentive);
        setFlowStep('success');
        // Auto-redirect after 2 seconds
        setTimeout(() => {
          onCreate(incentive);
        }, 2000);
      }
    };

    const canByoContinue = () => {
      if (byoStep === 1) return incentiveName.trim().length > 0;
      if (byoStep === 2) return selectedQuery && addressColumn && metricColumn;
      if (byoStep === 3) return totalRewardPool && rankAllocations.length > 0;
      return true;
    };

    const addRankAllocation = () => {
      const lastAlloc = rankAllocations[rankAllocations.length - 1];
      const nextFrom = lastAlloc ? lastAlloc.to + 1 : 1;
      setRankAllocations([...rankAllocations, { from: nextFrom, to: nextFrom, value: 0.5 }]);
    };

    const updateRankAllocation = (index, field, value) => {
      const updated = [...rankAllocations];
      updated[index] = { ...updated[index], [field]: field === 'value' ? parseFloat(value) || 0 : parseInt(value) || 0 };
      setRankAllocations(updated);
    };

    const removeRankAllocation = (index) => {
      setRankAllocations(rankAllocations.filter((_, i) => i !== index));
    };

    return (
      <div className="fixed inset-0 bg-gray-100 z-50 overflow-auto">
        {/* Header with stepper */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
          <div className="max-w-5xl mx-auto px-6 py-4">
            {/* Stepper */}
            <div className="flex items-center justify-between">
              {buildSteps.map((step, idx) => (
                <div key={step.num} className="flex items-center flex-1">
                  <div className={`flex items-center gap-2 px-4 py-2 rounded-full ${
                    byoStep === step.num
                      ? 'bg-violet-100 border border-violet-300'
                      : byoStep > step.num
                        ? 'text-green-600'
                        : 'text-gray-400'
                  }`}>
                    <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-medium ${
                      byoStep === step.num
                        ? 'bg-violet-600 text-white'
                        : byoStep > step.num
                          ? 'bg-green-500 text-white'
                          : 'bg-gray-300 text-white'
                    }`}>
                      {byoStep > step.num ? <Check className="w-3 h-3" /> : step.num}
                    </span>
                    <span className={`text-sm font-medium ${
                      byoStep === step.num ? 'text-violet-700' : byoStep > step.num ? 'text-green-600' : 'text-gray-400'
                    }`}>
                      {step.label}
                    </span>
                    {byoStep > step.num && (
                      <button
                        onClick={() => setByoStep(step.num)}
                        className="text-xs text-violet-600 hover:underline ml-1"
                      >
                        Edit
                      </button>
                    )}
                  </div>
                  {idx < buildSteps.length - 1 && (
                    <div className={`flex-1 h-0.5 mx-2 ${byoStep > step.num ? 'bg-green-500' : 'bg-gray-200'}`} />
                  )}
                </div>
              ))}
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="max-w-3xl mx-auto px-6 py-8">
          {/* Step 1: Configuration */}
          {byoStep === 1 && (
            <div>
              <div className="mb-6 border-b border-dashed border-gray-300 pb-4">
                <h2 className="text-lg font-semibold text-gray-900">Setup reward type and timing</h2>
              </div>

              <div className="space-y-6">
                {/* Basic Information */}
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <h3 className="font-medium text-gray-900 mb-4">Basic Information</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Incentive Name <span className="text-violet-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={incentiveName}
                        onChange={(e) => setIncentiveName(e.target.value)}
                        placeholder="A descriptive name for your incentive"
                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                      <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Brief description of what this incentive is about"
                        rows={3}
                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 resize-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Incentive Image</label>
                      <p className="text-xs text-gray-500 mb-2">Upload an image to for your incentive</p>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-violet-400 transition-colors cursor-pointer">
                        <div className="text-gray-400 mb-2">
                          <Download className="w-6 h-6 mx-auto" />
                        </div>
                        <p className="text-sm text-gray-600">Drag and drop or <span className="text-violet-600">browse</span> for a file to upload.</p>
                        <p className="text-xs text-gray-400 mt-1">PNG or JPEG files up to 10MB</p>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Campaign</label>
                      <input
                        type="text"
                        value={campaign}
                        onChange={(e) => setCampaign(e.target.value)}
                        placeholder="Enter campaign"
                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Launch Configuration */}
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <h3 className="font-medium text-gray-900 mb-4">Launch Configuration</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Launch Type <span className="text-violet-500">*</span>
                      </label>
                      <select
                        value={launchType}
                        onChange={(e) => setLaunchType(e.target.value)}
                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
                      >
                        <option value="recurring">Recurring</option>
                        <option value="one-time">One-time</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Launch Date Range</label>
                      <div className="flex items-center gap-2 px-4 py-2.5 bg-violet-50 border border-violet-200 rounded-lg">
                        <Clock className="w-4 h-4 text-violet-500" />
                        <span className="text-sm text-violet-700">01/22/2026 12:17 PM to 02/05/2026 12:17 PM</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-2">This incentive will run for 14 days, starting Jan 22, 2026, 12:17 PM and ending Feb 05, 2026, 12:17 PM</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Frequency <span className="text-violet-500">*</span>
                      </label>
                      <select
                        value={frequency}
                        onChange={(e) => setFrequency(e.target.value)}
                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
                      >
                        <option value="daily">Daily</option>
                        <option value="weekly">Weekly</option>
                        <option value="monthly">Monthly</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Distribution Settings */}
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <h3 className="font-medium text-gray-900 mb-4">Distribution Settings</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Distribution Method <span className="text-violet-500">*</span>
                      </label>
                      <select
                        value={distributionMethod}
                        onChange={(e) => setDistributionMethod(e.target.value)}
                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
                      >
                        <option value="claim">Claim</option>
                        <option value="airdrop">Airdrop</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Claim Window Start Time <span className="text-violet-500">*</span>
                      </label>
                      <input
                        type="time"
                        value={claimWindowStart}
                        onChange={(e) => setClaimWindowStart(e.target.value)}
                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Claim Window Duration (hours) <span className="text-violet-500">*</span>
                      </label>
                      <input
                        type="number"
                        value={claimWindowDuration}
                        onChange={(e) => setClaimWindowDuration(e.target.value)}
                        placeholder="24"
                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
                      />
                    </div>
                    <div className="pt-2">
                      <p className="text-sm font-medium text-gray-700">Snapshot Timing</p>
                      <p className="text-xs text-gray-500">Snapshot will be taken automatically at campaign end period</p>
                    </div>
                  </div>
                </div>

                {/* Timezone Settings */}
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <h3 className="font-medium text-gray-900 mb-4">Timezone Settings</h3>
                  <p className="text-sm text-gray-500 mb-4">Configure the timezone for your incentives. This will be used to determine the timezone for the claim window and data collection snapshots.</p>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Timezone Offset (hours from UTC) <span className="text-violet-500">*</span>
                    </label>
                    <input
                      type="number"
                      value={timezoneOffset}
                      onChange={(e) => setTimezoneOffset(e.target.value)}
                      placeholder="-5"
                      className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Audience */}
          {byoStep === 2 && (
            <div>
              <div className="mb-6 border-b border-dashed border-gray-300 pb-4">
                <h2 className="text-lg font-semibold text-gray-900">Define eligibility and audience</h2>
              </div>

              <div className="space-y-6">
                {/* Eligibility Restriction (Optional) - NOW FIRST */}
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="font-medium text-gray-900">Eligibility Restriction</h3>
                      <p className="text-sm text-gray-500">Define who can qualify for rewards</p>
                    </div>
                    <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded">Optional</span>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => {
                        setAudienceType('all');
                        setSelectedEligibility(null);
                      }}
                      className={`relative flex items-start gap-3 p-4 rounded-xl border-2 transition-all text-left ${
                        audienceType === 'all'
                          ? 'border-violet-500 bg-violet-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className={`w-4 h-4 mt-0.5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                        audienceType === 'all' ? 'border-violet-500' : 'border-gray-300'
                      }`}>
                        {audienceType === 'all' && <div className="w-2 h-2 rounded-full bg-violet-500" />}
                      </div>
                      <div>
                        <span className={`font-medium ${audienceType === 'all' ? 'text-violet-900' : 'text-gray-900'}`}>
                          Open to All
                        </span>
                        <p className="text-xs text-gray-500 mt-0.5">Anyone can qualify for this incentive</p>
                      </div>
                    </button>

                    <button
                      onClick={() => setAudienceType('segment')}
                      className={`relative flex items-start gap-3 p-4 rounded-xl border-2 transition-all text-left ${
                        audienceType === 'segment'
                          ? 'border-violet-500 bg-violet-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className={`w-4 h-4 mt-0.5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                        audienceType === 'segment' ? 'border-violet-500' : 'border-gray-300'
                      }`}>
                        {audienceType === 'segment' && <div className="w-2 h-2 rounded-full bg-violet-500" />}
                      </div>
                      <div>
                        <span className={`font-medium ${audienceType === 'segment' ? 'text-violet-900' : 'text-gray-900'}`}>
                          Restrict to Segment
                        </span>
                        <p className="text-xs text-gray-500 mt-0.5">Only specific wallets can qualify</p>
                      </div>
                    </button>
                  </div>

                  {audienceType === 'segment' && (
                    <div className="mt-4 space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Select Segment</label>
                        <div className="relative">
                          <button
                            onClick={() => setShowEligibilityDropdown(!showEligibilityDropdown)}
                            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-left flex items-center justify-between hover:bg-gray-100 transition-colors"
                          >
                            <span className={selectedEligibility ? 'text-gray-900' : 'text-gray-400'}>
                              {selectedEligibilityData ? `${selectedEligibilityData.name} (${formatNumber(selectedEligibilityData.walletCount)} wallets)` : 'Select a segment...'}
                            </span>
                            <ChevronDown className="w-4 h-4 text-gray-400" />
                          </button>

                          {showEligibilityDropdown && (
                            <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 max-h-60 overflow-auto">
                              {eligibilitySegments.map((segment) => (
                                <button
                                  key={segment.id}
                                  onClick={() => {
                                    setSelectedEligibility(segment.id);
                                    setShowEligibilityDropdown(false);
                                  }}
                                  className="w-full px-4 py-3 text-left hover:bg-gray-50"
                                >
                                  <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-900">{segment.name}</span>
                                    <span className="text-xs text-gray-500">{formatNumber(segment.walletCount)} wallets</span>
                                  </div>
                                  <p className="text-xs text-gray-400 mt-0.5">{segment.description}</p>
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>

                      {selectedEligibilityData && (
                        <>
                          <div className="flex items-center justify-between p-3 bg-violet-50 rounded-lg">
                            <span className="text-sm text-gray-600">Eligible wallets</span>
                            <span className="text-sm font-semibold text-violet-600">{formatNumber(selectedEligibilityData.walletCount)}</span>
                          </div>

                        </>
                      )}
                    </div>
                  )}
                </div>

                {/* Select Target Audience - NOW SECOND */}
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <h3 className="font-medium text-gray-900 mb-2">Select Audience Query</h3>
                  <p className="text-sm text-gray-500 mb-4">Choose the data source for calculating reward distribution</p>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Audience Query <span className="text-violet-500">*</span>
                      </label>
                      <p className="text-xs text-gray-500 mb-2">Select a predefined query that determines how rewards are calculated</p>
                      <select
                        value={selectedQuery || ''}
                        onChange={(e) => {
                          setSelectedQuery(e.target.value);
                          const query = audienceQueries.find(q => q.id === e.target.value);
                          if (query) {
                            setAddressColumn(query.addressColumn);
                            setMetricColumn(query.metricColumn);
                          }
                        }}
                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
                      >
                        <option value="">Select a query...</option>
                        {audienceQueries.map((query) => (
                          <option key={query.id} value={query.id}>{query.name}</option>
                        ))}
                      </select>
                    </div>

                    {selectedQueryData && (
                      <>
                        {/* Preview Data */}
                        <div className="mt-6">
                          <div className="flex items-center justify-between mb-3">
                            <h4 className="font-medium text-violet-600">{selectedQueryData.name}</h4>
                            <div className="flex gap-2">
                              <span className="text-xs bg-violet-100 text-violet-700 px-2 py-1 rounded">1 possible address columns</span>
                              <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">1 possible metric columns</span>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                            <RefreshCw className="w-4 h-4" />
                            Preview Data
                          </div>

                          <div className="bg-gray-50 rounded-lg overflow-hidden">
                            <table className="w-full text-sm">
                              <thead>
                                <tr className="border-b border-gray-200">
                                  <th className="text-left py-2 px-4 font-medium text-gray-600">
                                    {selectedQueryData.addressColumn}
                                    <span className="ml-2 text-xs bg-violet-500 text-white px-1.5 py-0.5 rounded">addr</span>
                                  </th>
                                  <th className="text-right py-2 px-4 font-medium text-gray-600">
                                    {selectedQueryData.metricColumn}
                                    <span className="ml-2 text-xs bg-gray-400 text-white px-1.5 py-0.5 rounded">metric</span>
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                {selectedQueryData.preview.map((row, idx) => (
                                  <tr key={idx} className="border-b border-gray-200 last:border-0">
                                    <td className="py-2 px-4 font-mono text-xs text-gray-600">{row.address}</td>
                                    <td className="py-2 px-4 text-right text-gray-900">{row.metric.toLocaleString()}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>

                        {/* Select Columns */}
                        <div className="mt-6 pt-6 border-t border-gray-200">
                          <h4 className="font-medium text-violet-600 mb-4">Column Mapping</h4>
                          <div className="space-y-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Address Column <span className="text-violet-500">*</span>
                              </label>
                              <select
                                value={addressColumn}
                                onChange={(e) => setAddressColumn(e.target.value)}
                                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
                              >
                                <option value={selectedQueryData.addressColumn}>{selectedQueryData.addressColumn}</option>
                              </select>
                              <p className="text-xs text-gray-500 mt-1">This column will be used for the user's address</p>
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Metric Column <span className="text-violet-500">*</span>
                              </label>
                              <select
                                value={metricColumn}
                                onChange={(e) => setMetricColumn(e.target.value)}
                                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
                              >
                                <option value={selectedQueryData.metricColumn}>{selectedQueryData.metricColumn}</option>
                              </select>
                              <p className="text-xs text-gray-500 mt-1">This column will be used to calculate reward distribution</p>
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Distribution Rules */}
          {byoStep === 3 && (
            <div>
              <div className="mb-8">
                <h2 className="text-lg font-semibold text-gray-900 mb-1">Distribution Rules</h2>
                <p className="text-sm text-gray-500">Configure how rewards will be distributed</p>
              </div>

              <div className="space-y-6">
                {/* Reward Pool Configuration */}
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <h3 className="font-medium text-gray-900 mb-4">Reward Pool Configuration</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Reward Token <span className="text-violet-500">*</span>
                      </label>
                      <select
                        value={rewardToken}
                        onChange={(e) => setRewardToken(e.target.value)}
                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
                      >
                        <option value="USDC">USDC</option>
                        <option value="SOL">SOL</option>
                        <option value="USDT">USDT</option>
                        <option value="BONK">BONK</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Total Reward Pool <span className="text-violet-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={totalRewardPool}
                        onChange={(e) => setTotalRewardPool(e.target.value)}
                        placeholder="10,000"
                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>

                {/* Distribution Configuration */}
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <div className="mb-4">
                    <h3 className="font-medium text-gray-900">Distribution Configuration</h3>
                    <p className="text-sm text-gray-500 mt-1">Quick Presets</p>
                  </div>

                  {/* Preset Card */}
                  <button
                    onClick={() => setDistributionPreset('base')}
                    className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                      distributionPreset === 'base'
                        ? 'border-violet-500 bg-violet-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                        distributionPreset === 'base' ? 'border-violet-500' : 'border-gray-300'
                      }`}>
                        {distributionPreset === 'base' && <div className="w-2 h-2 rounded-full bg-violet-500" />}
                      </div>
                      <div>
                        <span className={`font-medium ${distributionPreset === 'base' ? 'text-violet-900' : 'text-gray-900'}`}>
                          Base
                        </span>
                        <p className="text-xs text-gray-500 mt-0.5">Simple tiered distribution with gradually decreasing rewards</p>
                      </div>
                    </div>
                  </button>
                </div>

                {/* Distribution Method */}
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <h3 className="font-medium text-gray-900 mb-4">Distribution Method</h3>

                  {/* Method Tabs */}
                  <div className="flex border-b border-gray-200 mb-4">
                    {['formula', 'manual', 'csv'].map((method) => (
                      <button
                        key={method}
                        onClick={() => setDistributionConfigMethod(method)}
                        className={`px-4 py-2 text-sm font-medium border-b-2 -mb-px transition-colors ${
                          distributionConfigMethod === method
                            ? 'border-violet-500 text-violet-600'
                            : 'border-transparent text-gray-500 hover:text-gray-700'
                        }`}
                      >
                        {method.charAt(0).toUpperCase() + method.slice(1)}
                      </button>
                    ))}
                  </div>

                  {/* Manual Configuration */}
                  {distributionConfigMethod === 'manual' && (
                    <div className="space-y-4">
                      {/* Value Type / Ordering Mode Toggles */}
                      <div className="flex gap-4">
                        <div className="flex bg-gray-100 rounded-lg p-1">
                          <button
                            onClick={() => setValueType('percentage')}
                            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                              valueType === 'percentage'
                                ? 'bg-white text-gray-900 shadow-sm'
                                : 'text-gray-500 hover:text-gray-700'
                            }`}
                          >
                            By Percentage
                          </button>
                          <button
                            onClick={() => setValueType('fixed')}
                            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                              valueType === 'fixed'
                                ? 'bg-white text-gray-900 shadow-sm'
                                : 'text-gray-500 hover:text-gray-700'
                            }`}
                          >
                            Fixed Amount
                          </button>
                        </div>
                        <div className="flex bg-gray-100 rounded-lg p-1">
                          <button
                            onClick={() => setOrderingMode('tier')}
                            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                              orderingMode === 'tier'
                                ? 'bg-white text-gray-900 shadow-sm'
                                : 'text-gray-500 hover:text-gray-700'
                            }`}
                          >
                            Per Tier
                          </button>
                          <button
                            onClick={() => setOrderingMode('rank')}
                            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                              orderingMode === 'rank'
                                ? 'bg-white text-gray-900 shadow-sm'
                                : 'text-gray-500 hover:text-gray-700'
                            }`}
                          >
                            Per Rank
                          </button>
                        </div>
                      </div>

                      {/* Rank Allocations Table */}
                      <div className="border border-gray-200 rounded-lg overflow-hidden">
                        <table className="w-full">
                          <thead className="bg-gray-50">
                            <tr>
                              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Rank From</th>
                              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Rank To</th>
                              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                {valueType === 'percentage' ? 'Percentage' : 'Amount'}
                              </th>
                              <th className="px-4 py-3 w-12"></th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-200">
                            {rankAllocations.map((allocation, idx) => (
                              <tr key={idx}>
                                <td className="px-4 py-3">
                                  <input
                                    type="number"
                                    value={allocation.from}
                                    onChange={(e) => {
                                      const newAllocations = [...rankAllocations];
                                      newAllocations[idx].from = parseInt(e.target.value) || 0;
                                      setRankAllocations(newAllocations);
                                    }}
                                    className="w-20 px-3 py-1.5 bg-gray-50 border border-gray-200 rounded text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
                                  />
                                </td>
                                <td className="px-4 py-3">
                                  <input
                                    type="number"
                                    value={allocation.to}
                                    onChange={(e) => {
                                      const newAllocations = [...rankAllocations];
                                      newAllocations[idx].to = parseInt(e.target.value) || 0;
                                      setRankAllocations(newAllocations);
                                    }}
                                    className="w-20 px-3 py-1.5 bg-gray-50 border border-gray-200 rounded text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
                                  />
                                </td>
                                <td className="px-4 py-3">
                                  <div className="flex items-center gap-1">
                                    <input
                                      type="number"
                                      step="0.01"
                                      value={allocation.value}
                                      onChange={(e) => {
                                        const newAllocations = [...rankAllocations];
                                        newAllocations[idx].value = parseFloat(e.target.value) || 0;
                                        setRankAllocations(newAllocations);
                                      }}
                                      className="w-24 px-3 py-1.5 bg-gray-50 border border-gray-200 rounded text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
                                    />
                                    {valueType === 'percentage' && <span className="text-gray-500 text-sm">%</span>}
                                  </div>
                                </td>
                                <td className="px-4 py-3">
                                  <button
                                    onClick={() => {
                                      const newAllocations = rankAllocations.filter((_, i) => i !== idx);
                                      setRankAllocations(newAllocations);
                                    }}
                                    className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                                  >
                                    <X className="w-4 h-4" />
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      {/* Add Tier Button */}
                      <button
                        onClick={() => {
                          const lastAllocation = rankAllocations[rankAllocations.length - 1];
                          const newFrom = lastAllocation ? lastAllocation.to + 1 : 1;
                          setRankAllocations([
                            ...rankAllocations,
                            { from: newFrom, to: newFrom + 9, value: 5 }
                          ]);
                        }}
                        className="flex items-center gap-2 px-4 py-2 text-sm text-violet-600 hover:text-violet-700 font-medium"
                      >
                        <Plus className="w-4 h-4" />
                        Add Tier
                      </button>

                      {/* Total Allocated */}
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="text-sm text-gray-600">Total Allocated</span>
                        <span className={`text-sm font-semibold ${
                          rankAllocations.reduce((sum, a) => sum + a.value, 0) === 100
                            ? 'text-green-600'
                            : 'text-amber-600'
                        }`}>
                          {rankAllocations.reduce((sum, a) => sum + a.value, 0).toFixed(1)}%
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Formula Configuration */}
                  {distributionConfigMethod === 'formula' && (
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-500">Formula-based distribution allows you to define a mathematical formula for reward allocation.</p>
                      <textarea
                        placeholder="e.g., reward = base_amount * (1 / rank)"
                        rows={3}
                        className="w-full mt-3 px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 resize-none font-mono"
                      />
                    </div>
                  )}

                  {/* CSV Configuration */}
                  {distributionConfigMethod === 'csv' && (
                    <div className="p-4 bg-gray-50 rounded-lg text-center">
                      <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-500">Upload a CSV file with rank allocations</p>
                      <button className="mt-3 px-4 py-2 text-sm text-violet-600 hover:text-violet-700 font-medium border border-violet-200 rounded-lg hover:bg-violet-50">
                        Choose File
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Confirmation */}
          {byoStep === 4 && (
            <div>
              <div className="mb-8">
                <h2 className="text-lg font-semibold text-gray-900 mb-1">Confirmation</h2>
                <p className="text-sm text-gray-500">Review your incentive configuration before launching</p>
              </div>

              <div className="space-y-4">
                {/* Incentive Info */}
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-violet-100 flex items-center justify-center">
                      {selectedRewardType?.id === 'rebate' && <TrendingUp className="w-6 h-6 text-violet-600" />}
                      {selectedRewardType?.id === 'raffle' && <Gift className="w-6 h-6 text-violet-600" />}
                      {selectedRewardType?.id === 'leaderboard' && <Trophy className="w-6 h-6 text-violet-600" />}
                      {selectedRewardType?.id === 'direct' && <Zap className="w-6 h-6 text-violet-600" />}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{incentiveName || 'Untitled Incentive'}</h3>
                      <p className="text-sm text-gray-500">{description || 'Custom incentive'}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                    <div>
                      <span className="text-xs text-gray-400 uppercase tracking-wide">Type</span>
                      <p className="text-sm font-medium text-gray-900">Custom Build</p>
                    </div>
                    <div>
                      <span className="text-xs text-gray-400 uppercase tracking-wide">Reward Type</span>
                      <p className="text-sm font-medium text-gray-900">{selectedRewardType?.name}</p>
                    </div>
                  </div>
                </div>

                {/* Configuration Summary */}
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <h3 className="font-medium text-gray-900 mb-4">Configuration</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Launch Type</span>
                      <span className="text-sm font-medium text-gray-900 capitalize">{launchType}</span>
                    </div>
                    {startDate && (
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Start Date</span>
                        <span className="text-sm font-medium text-gray-900">{startDate}</span>
                      </div>
                    )}
                    {endDate && (
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">End Date</span>
                        <span className="text-sm font-medium text-gray-900">{endDate}</span>
                      </div>
                    )}
                    {launchType === 'recurring' && (
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Frequency</span>
                        <span className="text-sm font-medium text-gray-900 capitalize">{frequency}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Distribution Method</span>
                      <span className="text-sm font-medium text-gray-900 capitalize">{distributionMethod}</span>
                    </div>
                  </div>
                </div>

                {/* Audience Summary */}
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <h3 className="font-medium text-gray-900 mb-4">Audience</h3>
                  {selectedQueryData ? (
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Target Audience</span>
                        <span className="text-sm font-medium text-gray-900">{selectedQueryData.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Eligible Wallets</span>
                        <span className="text-sm font-medium text-violet-600">{formatNumber(selectedQueryData.userCount)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Address Column</span>
                        <span className="text-sm font-medium text-gray-900">{addressColumn}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Metric Column</span>
                        <span className="text-sm font-medium text-gray-900">{metricColumn}</span>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <Users className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-sm font-medium text-gray-700">No audience selected</p>
                        <p className="text-xs text-gray-500">Go back to select a target audience</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Distribution Summary */}
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <h3 className="font-medium text-gray-900 mb-4">Distribution Rules</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Reward Token</span>
                      <span className="text-sm font-medium text-gray-900">{rewardToken}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Total Reward Pool</span>
                      <span className="text-sm font-medium text-gray-900">{totalRewardPool} {rewardToken}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Distribution Method</span>
                      <span className="text-sm font-medium text-gray-900 capitalize">{distributionConfigMethod}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Tiers Configured</span>
                      <span className="text-sm font-medium text-gray-900">{rankAllocations.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Total Allocated</span>
                      <span className={`text-sm font-medium ${
                        rankAllocations.reduce((sum, a) => sum + a.value, 0) === 100
                          ? 'text-green-600'
                          : 'text-amber-600'
                      }`}>
                        {rankAllocations.reduce((sum, a) => sum + a.value, 0).toFixed(1)}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <footer className="bg-white border-t border-gray-200 sticky bottom-0">
          <div className="max-w-2xl mx-auto px-6 py-4 flex items-center justify-between">
            <span className="text-xs text-gray-400">* Required Fields</span>
            <button
              onClick={handleByoContinue}
              disabled={!canByoContinue()}
              className="px-6 py-2.5 bg-violet-600 text-white text-sm font-medium rounded-lg hover:bg-violet-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {byoStep === 4 ? 'Launch Incentive' : 'Continue'}
            </button>
          </div>
        </footer>
      </div>
    );
  }

  // Render configuration wizard
  return (
    <div className="fixed inset-0 bg-gray-50 z-50 overflow-auto">
      {/* Header with stepper */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={handleBack}
              className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              Back
            </button>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* Stepper */}
          <div className="flex items-center justify-center gap-4">
            {[
              { num: 1, label: 'Configure' },
              { num: 2, label: 'Review' },
            ].map((step, idx) => (
              <div key={step.num} className="flex items-center">
                <div className="flex items-center gap-2">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                    configStep >= step.num
                      ? 'bg-violet-600 text-white'
                      : 'bg-gray-200 text-gray-500'
                  }`}>
                    {configStep > step.num ? <Check className="w-3 h-3" /> : step.num}
                  </div>
                  <span className={`text-sm font-medium ${
                    configStep >= step.num ? 'text-gray-900' : 'text-gray-400'
                  }`}>
                    {step.label}
                  </span>
                </div>
                {idx < 1 && (
                  <div className={`w-24 h-px mx-4 ${
                    configStep > step.num ? 'bg-violet-600' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-2xl mx-auto px-6 py-8">
        {/* Step 1: Configuration */}
        {configStep === 1 && (
          <div>
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-1">Setup reward type and timing</h2>
              <p className="text-sm text-gray-500">Configure your {selectedRecipe?.name} incentive</p>
            </div>

            <div className="space-y-6">
              {/* Basic Information */}
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="font-medium text-gray-900 mb-4">Basic Information</h3>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Incentive Name <span className="text-violet-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={incentiveName}
                      onChange={(e) => setIncentiveName(e.target.value)}
                      placeholder="A descriptive name for your incentive"
                      className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Brief description of what this incentive is about"
                      rows={3}
                      className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent resize-none"
                    />
                  </div>
                </div>
              </div>

              {/* Launch Configuration */}
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="font-medium text-gray-900 mb-4">Launch Configuration</h3>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Launch Type <span className="text-violet-500">*</span>
                    </label>
                    <select
                      value={launchType}
                      onChange={(e) => setLaunchType(e.target.value)}
                      className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
                    >
                      <option value="recurring">Recurring</option>
                      <option value="one-time">One-time</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
                    <select
                      value={duration}
                      onChange={(e) => setDuration(e.target.value)}
                      className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
                    >
                      <option value="7">7 days</option>
                      <option value="14">14 days</option>
                      <option value="30">30 days</option>
                      <option value="90">90 days</option>
                    </select>
                  </div>

                  {launchType === 'recurring' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Frequency <span className="text-violet-500">*</span>
                      </label>
                      <select
                        value={frequency}
                        onChange={(e) => setFrequency(e.target.value)}
                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
                      >
                        <option value="daily">Daily</option>
                        <option value="weekly">Weekly</option>
                        <option value="monthly">Monthly</option>
                      </select>
                    </div>
                  )}
                </div>
              </div>

              {/* Eligibility */}
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-medium text-gray-900">Eligibility</h3>
                    <p className="text-sm text-gray-500">Who can participate in this incentive?</p>
                  </div>
                  <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded">Optional</span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {/* All Users Option */}
                  <button
                    onClick={() => {
                      setAudienceType('all');
                      setSelectedAudience(null);
                    }}
                    className={`relative flex items-start gap-3 p-4 rounded-xl border-2 transition-all text-left ${
                      audienceType === 'all'
                        ? 'border-violet-500 bg-violet-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className={`w-4 h-4 mt-0.5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                      audienceType === 'all' ? 'border-violet-500' : 'border-gray-300'
                    }`}>
                      {audienceType === 'all' && <div className="w-2 h-2 rounded-full bg-violet-500" />}
                    </div>
                    <div>
                      <span className={`font-medium ${audienceType === 'all' ? 'text-violet-900' : 'text-gray-900'}`}>
                        Open to All
                      </span>
                      <p className="text-xs text-gray-500 mt-0.5">Any user can participate</p>
                    </div>
                  </button>

                  {/* Restricted Option */}
                  <button
                    onClick={() => setAudienceType('segment')}
                    className={`relative flex items-start gap-3 p-4 rounded-xl border-2 transition-all text-left ${
                      audienceType === 'segment'
                        ? 'border-violet-500 bg-violet-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className={`w-4 h-4 mt-0.5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                      audienceType === 'segment' ? 'border-violet-500' : 'border-gray-300'
                    }`}>
                      {audienceType === 'segment' && <div className="w-2 h-2 rounded-full bg-violet-500" />}
                    </div>
                    <div>
                      <span className={`font-medium ${audienceType === 'segment' ? 'text-violet-900' : 'text-gray-900'}`}>
                        Restrict to Segment
                      </span>
                      <p className="text-xs text-gray-500 mt-0.5">Only specific wallets can participate</p>
                    </div>
                  </button>
                </div>

                {/* Segment Selection - Only when restricted */}
                {audienceType === 'segment' && (
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Select Segment</label>
                    <div className="relative">
                      <button
                        onClick={() => setShowAudienceDropdown(!showAudienceDropdown)}
                        className={`w-full px-4 py-3 border rounded-xl text-sm text-left flex items-center justify-between transition-colors ${
                          selectedAudience
                            ? 'bg-violet-50 border-violet-200'
                            : 'bg-gray-50 border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        {selectedAudienceData ? (
                          <span className="flex items-center gap-2">
                            <Layers className="w-4 h-4 text-violet-500" />
                            <span className="font-medium text-gray-900">{selectedAudienceData.name}</span>
                            <span className="text-xs text-gray-500">({formatNumber(selectedAudienceData.userCount)} wallets)</span>
                          </span>
                        ) : (
                          <span className="text-gray-400">Select a segment...</span>
                        )}
                        <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${showAudienceDropdown ? 'rotate-180' : ''}`} />
                      </button>

                      {showAudienceDropdown && (
                        <>
                          <div className="fixed inset-0 z-10" onClick={() => setShowAudienceDropdown(false)} />
                          <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg z-20 py-1 max-h-64 overflow-y-auto">
                            {audienceQueries.map(audience => (
                              <button
                                key={audience.id}
                                onClick={() => {
                                  setSelectedAudience(audience.id);
                                  setShowAudienceDropdown(false);
                                }}
                                className={`w-full text-left px-4 py-3 text-sm hover:bg-gray-50 flex items-center justify-between ${
                                  selectedAudience === audience.id ? 'bg-violet-50' : ''
                                }`}
                              >
                                <div className="flex items-center gap-2">
                                  <Layers className="w-4 h-4 text-violet-500" />
                                  <span className={`font-medium ${selectedAudience === audience.id ? 'text-violet-700' : 'text-gray-900'}`}>
                                    {audience.name}
                                  </span>
                                </div>
                                <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                                  audience.userCount === 0 ? 'bg-amber-100 text-amber-700' : 'bg-gray-100 text-gray-600'
                                }`}>
                                  {formatNumber(audience.userCount)} wallets
                                </span>
                              </button>
                            ))}
                          </div>
                        </>
                      )}
                    </div>

                    {/* Segment Info */}
                    {selectedAudienceData && (
                      <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Eligible wallets</span>
                          <span className="font-medium text-violet-600">{formatNumber(selectedAudienceData.userCount)}</span>
                        </div>
                        {selectedAudienceData.userCount === 0 && (
                          <p className="text-xs text-amber-600 mt-2 flex items-center gap-1">
                            <AlertTriangle className="w-3 h-3" />
                            This segment has no wallets yet
                          </p>
                        )}
                      </div>
                    )}

                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Review */}
        {configStep === 2 && (
          <div>
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-1">Review & Launch</h2>
              <p className="text-sm text-gray-500">Confirm your incentive configuration</p>
            </div>

            <div className="space-y-4">
              {/* Recipe Info */}
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-violet-100 flex items-center justify-center">
                    <RecipeIcon type={selectedRecipe?.icon} className="w-6 h-6 text-violet-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{incentiveName}</h3>
                    <p className="text-sm text-gray-500">{selectedRecipe?.description}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                  <div>
                    <span className="text-xs text-gray-400 uppercase tracking-wide">Recipe</span>
                    <p className="text-sm font-medium text-gray-900">{selectedRecipe?.name}</p>
                  </div>
                  <div>
                    <span className="text-xs text-gray-400 uppercase tracking-wide">Reward Type</span>
                    <p className="text-sm font-medium text-gray-900">{selectedRecipe?.reward}</p>
                  </div>
                </div>
              </div>

              {/* Configuration Summary */}
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="font-medium text-gray-900 mb-4">Configuration</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Launch Type</span>
                    <span className="text-sm font-medium text-gray-900 capitalize">{launchType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Duration</span>
                    <span className="text-sm font-medium text-gray-900">{duration} days</span>
                  </div>
                  {launchType === 'recurring' && (
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Frequency</span>
                      <span className="text-sm font-medium text-gray-900 capitalize">{frequency}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Eligibility Summary */}
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="font-medium text-gray-900 mb-4">Eligibility</h3>
                {selectedAudienceData ? (
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Restricted to</span>
                      <span className="text-sm font-medium text-gray-900">{selectedAudienceData.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Eligible Wallets</span>
                      <span className="text-sm font-medium text-violet-600">{formatNumber(selectedAudienceData.userCount)}</span>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <Users className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-700">Open to All</p>
                      <p className="text-xs text-gray-500">Any user can participate - no restrictions</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 sticky bottom-0">
        <div className="max-w-2xl mx-auto px-6 py-4 flex items-center justify-between">
          <span className="text-xs text-gray-400">* Required Fields</span>
          <button
            onClick={handleContinue}
            disabled={!canContinue()}
            className="flex items-center gap-2 px-6 py-2.5 bg-violet-600 hover:bg-violet-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white text-sm font-semibold rounded-lg transition-colors"
          >
            {configStep === 2 ? 'Launch Incentive' : 'Continue'}
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </footer>
    </div>
  );
};

// Show All Users Modal
const ShowAllUsersModal = ({ onClose, users, title, onSaveSegment, onCreateCampaign }) => {
  const allUsers = users || [
    { wallet: "0x7f3a...8c2d", current: "$42K", was: "$180K", change: "-77%", lastActive: "2 days ago" },
    { wallet: "0xa2c9...1b4e", current: "$31K", was: "$95K", change: "-67%", lastActive: "1 day ago" },
    { wallet: "0x3b7f...9d1a", current: "$18K", was: "$72K", change: "-75%", lastActive: "3 days ago" },
    { wallet: "0x9d2e...4f8c", current: "$28K", was: "$58K", change: "-52%", lastActive: "Today" },
    { wallet: "0x4c1a...7e3d", current: "$45K", was: "$89K", change: "-49%", lastActive: "1 day ago" },
    { wallet: "0x6b8f...2a9c", current: "$22K", was: "$64K", change: "-66%", lastActive: "2 days ago" },
    { wallet: "0x8e5d...1c7b", current: "$15K", was: "$48K", change: "-69%", lastActive: "4 days ago" },
    { wallet: "0x1f4a...9d6e", current: "$38K", was: "$110K", change: "-65%", lastActive: "1 day ago" },
    { wallet: "0x5c9b...3e8f", current: "$19K", was: "$55K", change: "-65%", lastActive: "2 days ago" },
    { wallet: "0x2d7e...6a1c", current: "$25K", was: "$71K", change: "-65%", lastActive: "3 days ago" },
    { wallet: "0x9a3f...8b2d", current: "$33K", was: "$82K", change: "-60%", lastActive: "1 day ago" },
    { wallet: "0x7c1e...4d9a", current: "$29K", was: "$66K", change: "-56%", lastActive: "Today" },
  ];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-white rounded-2xl w-full max-w-3xl mx-4 overflow-hidden shadow-2xl max-h-[85vh] flex flex-col" onClick={e => e.stopPropagation()}>
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-violet-100 flex items-center justify-center">
              <Users className="w-5 h-5 text-violet-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">{title || "At-Risk Whales"}</h3>
              <p className="text-sm text-gray-500">{allUsers.length} users matching criteria</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="grid grid-cols-5 gap-4 px-6 py-3 bg-gray-50 text-xs font-medium text-gray-500 uppercase tracking-wide sticky top-0 border-b border-gray-200">
            <span>Wallet</span>
            <span>Current Volume</span>
            <span>Previous Volume</span>
            <span>Change</span>
            <span>Last Active</span>
          </div>
          {allUsers.map((user, i) => (
            <div key={i} className="grid grid-cols-5 gap-4 px-6 py-4 hover:bg-gray-50 transition-colors cursor-pointer border-b border-gray-100">
              <div className="flex items-center gap-2">
                <span className="font-mono text-sm text-violet-600 font-medium">{user.wallet}</span>
                <ExternalLink className="w-3 h-3 text-gray-400" />
              </div>
              <span className="text-sm font-semibold text-gray-900">{user.current}</span>
              <span className="text-sm text-gray-500">{user.was}</span>
              <span className="text-sm font-semibold text-red-600">{user.change}</span>
              <span className="text-sm text-gray-500">{user.lastActive}</span>
            </div>
          ))}
        </div>

        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex gap-3">
          <button
            onClick={onSaveSegment}
            className="flex-1 py-2.5 px-4 bg-violet-600 hover:bg-violet-700 text-white text-sm font-semibold rounded-xl transition-colors flex items-center justify-center gap-2"
          >
            <Layers className="w-4 h-4" />
            Save as Segment
          </button>
          <button
            onClick={onCreateCampaign}
            className="flex-1 py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold rounded-xl transition-colors flex items-center justify-center gap-2"
          >
            <Gift className="w-4 h-4" />
            Create Campaign
          </button>
          <button
            onClick={onClose}
            className="py-2.5 px-4 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 text-sm font-semibold rounded-xl transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

// Enhanced Save Segment with Alert Modal
const SaveSegmentWithAlertModal = ({ onClose, onSave, segmentName, setSegmentName }) => {
  const [enableAlert, setEnableAlert] = useState(true);
  const [alertThreshold, setAlertThreshold] = useState('20');
  const [alertNotify, setAlertNotify] = useState(['email', 'inapp']);

  const toggleNotify = (type) => {
    if (alertNotify.includes(type)) {
      setAlertNotify(alertNotify.filter(n => n !== type));
    } else {
      setAlertNotify([...alertNotify, type]);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-white rounded-2xl w-full max-w-md mx-4 overflow-hidden shadow-2xl max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        <div className="px-6 py-4 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-violet-100 flex items-center justify-center">
              <Layers className="w-5 h-5 text-violet-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Save as Segment</h3>
              <p className="text-sm text-gray-500">Create a reusable audience segment</p>
            </div>
          </div>
        </div>

        <div className="px-6 py-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Segment Name</label>
            <input
              type="text"
              value={segmentName}
              onChange={(e) => setSegmentName(e.target.value)}
              placeholder="e.g., At-Risk Whales Q1"
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
            />
          </div>

          <div className="bg-gray-50 rounded-xl p-4">
            <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Segment Definition</h4>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Users</span>
                <span className="font-semibold text-gray-900">12</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Total Volume</span>
                <span className="font-semibold text-gray-900">$890K</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Definition</span>
                <span className="font-medium text-violet-600">Top 5% by volume AND -30% activity</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Refresh</span>
                <span className="font-medium text-gray-900">Daily</span>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Bell className="w-4 h-4 text-violet-600" />
                <span className="text-sm font-medium text-gray-700">Alert me when segment changes</span>
              </div>
              <button
                onClick={() => setEnableAlert(!enableAlert)}
                className={`w-10 h-6 rounded-full transition-colors ${enableAlert ? 'bg-violet-600' : 'bg-gray-200'}`}
              >
                <div className={`w-4 h-4 bg-white rounded-full shadow transition-transform ${enableAlert ? 'translate-x-5' : 'translate-x-1'}`} />
              </button>
            </div>

            {enableAlert && (
              <div className="space-y-3 bg-violet-50 rounded-xl p-4 border border-violet-200">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">Trigger when size changes by</label>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">±</span>
                    <input
                      type="number"
                      value={alertThreshold}
                      onChange={(e) => setAlertThreshold(e.target.value)}
                      className="w-20 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
                    />
                    <span className="text-sm text-gray-600">%</span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">Notify via</label>
                  <div className="flex gap-2">
                    <button
                      onClick={() => toggleNotify('email')}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                        alertNotify.includes('email') ? 'bg-violet-600 text-white' : 'bg-white border border-gray-200 text-gray-600'
                      }`}
                    >
                      <Mail className="w-3.5 h-3.5" />
                      Email
                    </button>
                    <button
                      onClick={() => toggleNotify('inapp')}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                        alertNotify.includes('inapp') ? 'bg-violet-600 text-white' : 'bg-white border border-gray-200 text-gray-600'
                      }`}
                    >
                      <Bell className="w-3.5 h-3.5" />
                      In-app
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex gap-3">
          <button
            onClick={() => onSave(segmentName, enableAlert, alertThreshold, alertNotify)}
            disabled={!segmentName.trim()}
            className="flex-1 py-2.5 px-4 bg-violet-600 hover:bg-violet-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white text-sm font-semibold rounded-xl transition-colors flex items-center justify-center gap-2"
          >
            <Check className="w-4 h-4" />
            Save Segment
          </button>
          <button
            onClick={onClose}
            className="py-2.5 px-4 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 text-sm font-semibold rounded-xl transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

// Full Campaign Creation Flow Modal (with preview/approve step)
const CampaignApprovalModal = ({ onClose, onApprove, onEdit }) => {
  const [step, setStep] = useState('review'); // 'review' or 'edit'
  const [campaignName, setCampaignName] = useState('Whale Retention - Jan 2026');
  const [rewardType, setRewardType] = useState('fee_rebate');
  const [rewardAmount, setRewardAmount] = useState('50%');
  const [duration, setDuration] = useState('7');
  const [condition, setCondition] = useState('$50K volume');

  if (step === 'edit') {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={onClose}>
        <div className="bg-white rounded-2xl w-full max-w-lg mx-4 overflow-hidden shadow-2xl max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center">
                <Edit3 className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Edit Campaign Details</h3>
                <p className="text-sm text-gray-500">Modify before launching</p>
              </div>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <X className="w-5 h-5 text-gray-400" />
            </button>
          </div>

          <div className="px-6 py-4 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Campaign Name</label>
              <input
                type="text"
                value={campaignName}
                onChange={(e) => setCampaignName(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Reward Type</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'tokens', label: 'Tokens', icon: Wallet },
                  { id: 'fee_rebate', label: 'Fee Rebate', icon: TrendingUp },
                  { id: 'nft', label: 'NFT', icon: Gift }
                ].map(type => (
                  <button
                    key={type.id}
                    onClick={() => setRewardType(type.id)}
                    className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border transition-all ${
                      rewardType === type.id
                        ? 'border-violet-500 bg-violet-50 text-violet-700'
                        : 'border-gray-200 hover:border-gray-300 text-gray-600'
                    }`}
                  >
                    <type.icon className="w-5 h-5" />
                    <span className="text-xs font-medium">{type.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Reward Amount</label>
                <input
                  type="text"
                  value={rewardAmount}
                  onChange={(e) => setRewardAmount(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Duration</label>
                <select
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent bg-white"
                >
                  <option value="7">7 days</option>
                  <option value="14">14 days</option>
                  <option value="30">30 days</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Qualification Condition</label>
              <input
                type="text"
                value={condition}
                onChange={(e) => setCondition(e.target.value)}
                placeholder="e.g., Must hit $50K volume"
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex gap-3">
            <button
              onClick={() => setStep('review')}
              className="flex-1 py-2.5 px-4 bg-violet-600 hover:bg-violet-700 text-white text-sm font-semibold rounded-xl transition-colors"
            >
              Review Changes
            </button>
            <button
              onClick={onClose}
              className="py-2.5 px-4 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 text-sm font-semibold rounded-xl transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-white rounded-2xl w-full max-w-lg mx-4 overflow-hidden shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center">
              <Target className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Review Campaign</h3>
              <p className="text-sm text-gray-500">AI-generated campaign proposal</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        <div className="px-6 py-4 space-y-4">
          <div className="bg-gradient-to-r from-violet-50 to-purple-50 border border-violet-200 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-1">
              <Sparkles className="w-4 h-4 text-violet-600" />
              <span className="text-xs font-semibold text-violet-600 uppercase tracking-wide">AI Recommendation</span>
            </div>
            <p className="text-sm text-violet-800">
              Based on historical data, a targeted fee rebate for these 12 whales could recover ~$500K weekly volume.
              Similar campaigns had 60% success rate.
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl divide-y divide-gray-100">
            <div className="px-4 py-3 flex items-center justify-between">
              <span className="text-sm text-gray-600">Campaign Name</span>
              <span className="text-sm font-semibold text-gray-900">{campaignName}</span>
            </div>
            <div className="px-4 py-3 flex items-center justify-between">
              <span className="text-sm text-gray-600">Target</span>
              <span className="text-sm font-semibold text-gray-900">12 at-risk whales</span>
            </div>
            <div className="px-4 py-3 flex items-center justify-between">
              <span className="text-sm text-gray-600">Offer</span>
              <span className="text-sm font-semibold text-emerald-600">{rewardAmount} fee rebate for {duration} days</span>
            </div>
            <div className="px-4 py-3 flex items-center justify-between">
              <span className="text-sm text-gray-600">Condition</span>
              <span className="text-sm font-semibold text-gray-900">Must hit {condition} to qualify</span>
            </div>
            <div className="px-4 py-3 flex items-center justify-between">
              <span className="text-sm text-gray-600">Budget</span>
              <span className="text-sm font-semibold text-amber-600">$4,500 max rebate exposure</span>
            </div>
            <div className="px-4 py-3 flex items-center justify-between">
              <span className="text-sm text-gray-600">Expected Recovery</span>
              <span className="text-sm font-semibold text-emerald-600">$500K+ weekly volume</span>
            </div>
          </div>
        </div>

        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex gap-3">
          <button
            onClick={() => onApprove({ name: campaignName, rewardType, rewardAmount, duration })}
            className="flex-1 py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold rounded-xl transition-colors flex items-center justify-center gap-2"
          >
            <Check className="w-4 h-4" />
            Approve & Launch
          </button>
          <button
            onClick={() => setStep('edit')}
            className="py-2.5 px-4 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 text-sm font-semibold rounded-xl transition-colors flex items-center justify-center gap-2"
          >
            <Edit3 className="w-4 h-4" />
            Edit Details
          </button>
          <button
            onClick={onClose}
            className="py-2.5 px-4 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 text-sm font-semibold rounded-xl transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

// Export Report Modal
const ExportReportModal = ({ onClose, onExport, title }) => {
  const [exportFormat, setExportFormat] = useState('pdf');
  const [includeCharts, setIncludeCharts] = useState(true);
  const [includeRawData, setIncludeRawData] = useState(true);
  const [emailTo, setEmailTo] = useState('');

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-white rounded-2xl w-full max-w-md mx-4 overflow-hidden shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
              <FileText className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Export Report</h3>
              <p className="text-sm text-gray-500">{title || "Analysis Results"}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        <div className="px-6 py-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Export Format</label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'pdf', label: 'PDF', icon: FileText },
                { id: 'csv', label: 'CSV', icon: BarChart },
                { id: 'json', label: 'JSON', icon: FileText }
              ].map(format => (
                <button
                  key={format.id}
                  onClick={() => setExportFormat(format.id)}
                  className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border transition-all ${
                    exportFormat === format.id
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-200 hover:border-gray-300 text-gray-600'
                  }`}
                >
                  <format.icon className="w-5 h-5" />
                  <span className="text-xs font-medium">{format.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700">Include in Export</label>
            <label className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl cursor-pointer">
              <input
                type="checkbox"
                checked={includeCharts}
                onChange={() => setIncludeCharts(!includeCharts)}
                className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <div>
                <span className="text-sm font-medium text-gray-700">Charts & Visualizations</span>
                <p className="text-xs text-gray-500">Include sparklines and trend charts</p>
              </div>
            </label>
            <label className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl cursor-pointer">
              <input
                type="checkbox"
                checked={includeRawData}
                onChange={() => setIncludeRawData(!includeRawData)}
                className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <div>
                <span className="text-sm font-medium text-gray-700">Raw Data</span>
                <p className="text-xs text-gray-500">Include underlying user data</p>
              </div>
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Email report to (optional)</label>
            <input
              type="email"
              value={emailTo}
              onChange={(e) => setEmailTo(e.target.value)}
              placeholder="team@company.com"
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex gap-3">
          <button
            onClick={() => onExport({ format: exportFormat, includeCharts, includeRawData, emailTo })}
            className="flex-1 py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl transition-colors flex items-center justify-center gap-2"
          >
            <Download className="w-4 h-4" />
            Export Report
          </button>
          <button
            onClick={onClose}
            className="py-2.5 px-4 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 text-sm font-semibold rounded-xl transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

// Share Modal
const ShareModal = ({ onClose, onShare, title }) => {
  const [shareMethod, setShareMethod] = useState('link');
  const [shareWith, setShareWith] = useState('');
  const [linkCopied, setLinkCopied] = useState(false);

  const handleCopyLink = () => {
    setLinkCopied(true);
    setTimeout(() => setLinkCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-white rounded-2xl w-full max-w-md mx-4 overflow-hidden shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center">
              <Share2 className="w-5 h-5 text-indigo-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Share</h3>
              <p className="text-sm text-gray-500">{title || "Analysis Results"}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        <div className="px-6 py-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Share via</label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'link', label: 'Copy Link', icon: Link },
                { id: 'email', label: 'Email', icon: Mail },
                { id: 'slack', label: 'Slack', icon: MessageSquare }
              ].map(method => (
                <button
                  key={method.id}
                  onClick={() => setShareMethod(method.id)}
                  className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border transition-all ${
                    shareMethod === method.id
                      ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                      : 'border-gray-200 hover:border-gray-300 text-gray-600'
                  }`}
                >
                  <method.icon className="w-5 h-5" />
                  <span className="text-xs font-medium">{method.label}</span>
                </button>
              ))}
            </div>
          </div>

          {shareMethod === 'link' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Shareable Link</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  readOnly
                  value="https://torque.so/reports/ar-2026-01-15..."
                  className="flex-1 px-4 py-2.5 border border-gray-200 rounded-xl text-sm bg-gray-50 text-gray-600"
                />
                <button
                  onClick={handleCopyLink}
                  className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-colors flex items-center gap-2 ${
                    linkCopied ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}
                >
                  {linkCopied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  {linkCopied ? 'Copied!' : 'Copy'}
                </button>
              </div>
            </div>
          )}

          {(shareMethod === 'email' || shareMethod === 'slack') && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                {shareMethod === 'email' ? 'Email addresses' : 'Slack channels'}
              </label>
              <input
                type="text"
                value={shareWith}
                onChange={(e) => setShareWith(e.target.value)}
                placeholder={shareMethod === 'email' ? 'team@company.com, analyst@company.com' : '#growth, #analytics'}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Add a message (optional)</label>
            <textarea
              rows={2}
              placeholder="Check out this analysis of at-risk users..."
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
            />
          </div>
        </div>

        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex gap-3">
          <button
            onClick={() => onShare({ method: shareMethod, shareWith })}
            className="flex-1 py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-xl transition-colors flex items-center justify-center gap-2"
          >
            <Share2 className="w-4 h-4" />
            {shareMethod === 'link' ? 'Done' : 'Send'}
          </button>
          <button
            onClick={onClose}
            className="py-2.5 px-4 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 text-sm font-semibold rounded-xl transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

// Investigate More Modal
const InvestigateMoreModal = ({ onClose, onInvestigate, title }) => {
  const suggestions = [
    { icon: TrendingDown, label: "Why is activity declining?", description: "Analyze the root causes of the volume drop" },
    { icon: Users, label: "Where are they going?", description: "Check competitor activity for these wallets" },
    { icon: Clock, label: "When did it start?", description: "Find the exact point decline began" },
    { icon: Lightbulb, label: "What worked before?", description: "Review similar situations and outcomes" },
  ];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-white rounded-2xl w-full max-w-md mx-4 overflow-hidden shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center">
              <Lightbulb className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Investigate More</h3>
              <p className="text-sm text-gray-500">Dig deeper into this data</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        <div className="px-6 py-4 space-y-3">
          <p className="text-sm text-gray-600 mb-4">
            Select an investigation angle or ask a custom question:
          </p>

          {suggestions.map((s, i) => (
            <button
              key={i}
              onClick={() => onInvestigate(s.label)}
              className="w-full flex items-start gap-3 p-4 rounded-xl border border-gray-200 hover:border-violet-300 hover:bg-violet-50 transition-all text-left"
            >
              <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
                <s.icon className="w-5 h-5 text-gray-600" />
              </div>
              <div>
                <span className="text-sm font-semibold text-gray-900">{s.label}</span>
                <p className="text-xs text-gray-500 mt-0.5">{s.description}</p>
              </div>
            </button>
          ))}

          <div className="pt-2">
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Or ask a custom question</label>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="What would you like to know?"
                className="flex-1 px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
              />
              <button
                onClick={() => onInvestigate("custom")}
                className="px-4 py-2.5 bg-violet-600 hover:bg-violet-700 text-white rounded-xl transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
          <button
            onClick={onClose}
            className="w-full py-2.5 px-4 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 text-sm font-semibold rounded-xl transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

// Opportunity Detail Modal
const OpportunityDetailModal = ({ opportunity, onClose, onAction }) => {
  if (!opportunity) return null;

  const colorMap = {
    violet: { bg: 'bg-violet-600', hover: 'hover:bg-violet-700' },
    emerald: { bg: 'bg-emerald-600', hover: 'hover:bg-emerald-700' },
    amber: { bg: 'bg-amber-500', hover: 'hover:bg-amber-600' },
    red: { bg: 'bg-red-600', hover: 'hover:bg-red-700' }
  };

  const barColorMap = {
    emerald: 'bg-emerald-500',
    amber: 'bg-amber-400',
    red: 'bg-red-500',
    gray: 'bg-gray-300'
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-violet-100 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-violet-600" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-900">{opportunity.title}</h2>
                <p className="text-xs text-gray-500 uppercase tracking-wide">{opportunity.subtitle}</p>
              </div>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <X className="w-5 h-5 text-gray-400" />
            </button>
          </div>
          <div className="mt-4">
            <span className="text-3xl font-bold text-emerald-600">{opportunity.value}</span>
            <span className="text-sm text-gray-500 ml-2">{opportunity.valueLabel}</span>
          </div>
        </div>

        <div className="px-6 py-4 border-b border-gray-100">
          <p className="text-xs text-gray-500 uppercase tracking-wide mb-3">Health Distribution</p>
          <div className="h-3 rounded-full overflow-hidden flex mb-3">
            {opportunity.healthDistribution.map((segment, i) => (
              <div
                key={i}
                className={barColorMap[segment.color]}
                style={{ width: `${segment.percent}%` }}
              />
            ))}
          </div>
          <div className="flex justify-between text-xs">
            {opportunity.healthDistribution.map((segment, i) => (
              <span key={i} className="flex items-center gap-1">
                <span className={`inline-block w-2 h-2 rounded-full ${barColorMap[segment.color]}`} />
                {segment.label}
                <span className="text-gray-500">{segment.value.toLocaleString()} ({segment.percent}%)</span>
              </span>
            ))}
          </div>
        </div>

        <div className="px-6 py-4 border-b border-gray-100">
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
              <Check className="w-3.5 h-3.5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900 mb-1">AI Insight</p>
              <p className="text-sm text-gray-600">{opportunity.insight}</p>
            </div>
          </div>
        </div>

        <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
          <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">Benchmark</p>
          <p className="text-sm font-semibold text-gray-900 mb-1">Proof</p>
          <p className="text-sm text-gray-600">{opportunity.proof}</p>
        </div>

        <div className="p-6 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-3 px-4 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 text-sm font-semibold rounded-xl transition-colors"
          >
            Close
          </button>
          <button
            onClick={() => onAction(opportunity.query)}
            className={`flex-1 py-3 px-4 ${colorMap[opportunity.ctaColor].bg} ${colorMap[opportunity.ctaColor].hover} text-white text-sm font-semibold rounded-xl transition-colors`}
          >
            {opportunity.cta}
          </button>
        </div>
      </div>
    </div>
  );
};

// Segment Detail View - Full Analysis Page
const SegmentDetailView = ({ segment, onClose, onCreateCampaign }) => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [topFilter, setTopFilter] = useState('25');
  const [declineFilter, setDeclineFilter] = useState('50');

  if (!segment) return null;

  const colorClasses = {
    red: { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-600', button: 'bg-red-600 hover:bg-red-700' },
    emerald: { bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-600', button: 'bg-emerald-600 hover:bg-emerald-700' },
    violet: { bg: 'bg-violet-50', border: 'border-violet-200', text: 'text-violet-600', button: 'bg-violet-600 hover:bg-violet-700' },
    blue: { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-600', button: 'bg-blue-600 hover:bg-blue-700' }
  };

  const colors = colorClasses[segment.color] || colorClasses.violet;

  // Mock extended user data for the full view
  const extendedUsers = [
    { rank: 1, wallet: "0x7f3a...8c2d", volume30d: "$49.97M", currentWeek: "$0.00", priorWeek: "$1.03M", decline: "-100%", risk: "critical", daysSincePeak: 7 },
    { rank: 2, wallet: "0xa2c9...1b4e", volume30d: "$16.87M", currentWeek: "$0.00", priorWeek: "$376.42K", decline: "-100%", risk: "critical", daysSincePeak: 7 },
    { rank: 3, wallet: "0x3b7f...9d1a", volume30d: "$15.67M", currentWeek: "$0.00", priorWeek: "$7.30M", decline: "-100%", risk: "critical", daysSincePeak: 7 },
    { rank: 4, wallet: "0x8d4e...2f1a", volume30d: "$14.80M", currentWeek: "$0.00", priorWeek: "$923.74K", decline: "-100%", risk: "critical", daysSincePeak: 7 },
    { rank: 5, wallet: "0x1c9b...7e3d", volume30d: "$11.70M", currentWeek: "$0.00", priorWeek: "$11.70M", decline: "-100%", risk: "critical", daysSincePeak: 7 },
    { rank: 6, wallet: "0x5a2f...9c8b", volume30d: "$9.45M", currentWeek: "$124K", priorWeek: "$892K", decline: "-86%", risk: "critical", daysSincePeak: 5 },
    { rank: 7, wallet: "0x6d9e...2a7c", volume30d: "$8.21M", currentWeek: "$245K", priorWeek: "$1.2M", decline: "-80%", risk: "critical", daysSincePeak: 4 },
    { rank: 8, wallet: "0x2f8c...5d4e", volume30d: "$7.89M", currentWeek: "$312K", priorWeek: "$987K", decline: "-68%", risk: "warning", daysSincePeak: 6 }
  ];

  const filteredUsers = activeFilter === 'all' ? extendedUsers :
    activeFilter === 'critical' ? extendedUsers.filter(u => u.risk === 'critical') :
    activeFilter === 'warning' ? extendedUsers.filter(u => u.risk === 'warning') :
    extendedUsers.slice(0, 3);

  return (
    <div className="flex-1 flex flex-col bg-gray-50 overflow-hidden">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl ${colors.bg} flex items-center justify-center`}>
                <Layers className={`w-5 h-5 ${colors.text}`} />
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-900">{segment.name}</h1>
                <p className="text-sm text-gray-500">{segment.description}</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="px-4 py-2 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 text-sm font-medium rounded-xl transition-colors flex items-center gap-2">
              <Download className="w-4 h-4" />
              Export
            </button>
            <button
              onClick={onCreateCampaign}
              className={`px-4 py-2 ${colors.button} text-white text-sm font-medium rounded-xl transition-colors flex items-center gap-2`}
            >
              <Gift className="w-4 h-4" />
              Create Campaign
            </button>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-4 mt-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">Top Users:</span>
            {['10', '25', '40'].map(val => (
              <button
                key={val}
                onClick={() => setTopFilter(val)}
                className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
                  topFilter === val ? `${colors.button} text-white` : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
                }`}
              >
                Top {val}%
              </button>
            ))}
          </div>
          <div className="w-px h-6 bg-gray-200" />
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">Decline:</span>
            {['30', '50', '75'].map(val => (
              <button
                key={val}
                onClick={() => setDeclineFilter(val)}
                className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
                  declineFilter === val ? `${colors.button} text-white` : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
                }`}
              >
                &gt;{val}%
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
        {/* Alert Banner */}
        <div className={`${colors.bg} border ${colors.border} rounded-xl px-5 py-3 mb-6 flex items-center justify-between`}>
          <div className="flex items-center gap-2">
            <AlertTriangle className={`w-4 h-4 ${colors.text}`} />
            <span className="text-sm">
              <span className={`font-semibold ${colors.text}`}>{segment.breakdown?.[0]?.value || 754} high-volume traders</span>
              <span className="text-gray-700"> showing critical decline (&gt;75%) — immediate intervention recommended</span>
            </span>
          </div>
          <button className={`text-sm font-medium ${colors.text} flex items-center gap-1 hover:underline`}>
            View Critical <ArrowUpRight className="w-3 h-3" />
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-5 gap-4 mb-6">
          {segment.stats?.map((stat, i) => (
            <div key={i} className="bg-white border border-gray-200 rounded-xl p-4">
              <div className={`text-2xl font-bold ${i === 0 ? colors.text : 'text-gray-900'}`}>{stat.value}</div>
              <div className="text-xs text-gray-500 mt-1">{stat.sublabel || stat.label}</div>
            </div>
          ))}
          {segment.breakdown?.map((item, i) => (
            <div key={`breakdown-${i}`} className="bg-white border border-gray-200 rounded-xl p-4">
              <div className={`text-2xl font-bold ${
                item.color === 'red' ? 'text-red-600' : item.color === 'amber' ? 'text-amber-600' : 'text-gray-900'
              }`}>{item.value}</div>
              <div className="text-xs text-gray-500 mt-1">{item.sublabel}</div>
            </div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-2 gap-6 mb-6">
          {/* Decline Distribution */}
          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <h3 className={`text-sm font-semibold ${colors.text} mb-1`}>Decline Distribution</h3>
            <p className="text-xs text-gray-500 mb-4">Severity breakdown of volume declines</p>
            <div className="h-48 flex items-end gap-3">
              {(segment.chartData?.distribution || [
                { range: "50-60%", count: 120 },
                { range: "60-70%", count: 145 },
                { range: "70-80%", count: 180 },
                { range: "80-90%", count: 100 },
                { range: "90-100%", count: 554 }
              ]).map((item, i) => {
                const maxCount = 600;
                const height = (item.count / maxCount) * 100;
                const isHighest = item.count === Math.max(...(segment.chartData?.distribution || [{ count: 554 }]).map(d => d.count));
                return (
                  <div key={i} className="flex-1 flex flex-col items-center gap-2">
                    <div
                      className={`w-full rounded-t-lg transition-all ${
                        isHighest ? colors.button.split(' ')[0] : 'bg-gray-200'
                      }`}
                      style={{ height: `${height}%` }}
                    />
                    <span className="text-xs text-gray-500">{item.range}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Daily Volume Trend */}
          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <h3 className={`text-sm font-semibold ${colors.text} mb-1`}>Daily Volume Trend</h3>
            <p className="text-xs text-gray-500 mb-4">Top user activity over 14 days</p>
            <div className="h-48 relative">
              {/* Y-axis labels */}
              <div className="absolute left-0 top-0 bottom-6 w-12 flex flex-col justify-between text-xs text-gray-400">
                <span>$2.0B</span>
                <span>$1.5B</span>
                <span>$1.0B</span>
                <span>$500M</span>
                <span>$0</span>
              </div>
              {/* Chart area */}
              <div className="ml-14 h-full flex items-end">
                <svg className="w-full h-40" viewBox="0 0 300 100" preserveAspectRatio="none">
                  <path
                    d="M0,10 Q30,15 60,20 T120,40 T180,60 T240,75 T300,85"
                    fill="none"
                    stroke={segment.color === 'red' ? '#ef4444' : segment.color === 'emerald' ? '#10b981' : '#8b5cf6'}
                    strokeWidth="2"
                  />
                  {[0, 60, 120, 180, 240, 300].map((x, i) => (
                    <circle
                      key={i}
                      cx={x}
                      cy={10 + i * 15}
                      r="4"
                      fill="white"
                      stroke={segment.color === 'red' ? '#ef4444' : segment.color === 'emerald' ? '#10b981' : '#8b5cf6'}
                      strokeWidth="2"
                    />
                  ))}
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Insight Banner */}
        <div className={`${colors.bg} border ${colors.border} rounded-xl px-5 py-4 mb-6 flex items-start gap-3`}>
          <Lightbulb className={`w-5 h-5 ${colors.text} flex-shrink-0 mt-0.5`} />
          <div>
            <span className={`font-semibold ${colors.text}`}>Why high-volume churn matters: </span>
            <span className="text-gray-700">{segment.insight}</span>
          </div>
        </div>

        {/* Data Table */}
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Layers className={`w-4 h-4 ${colors.text}`} />
              <span className="font-semibold text-gray-900">{segment.name}</span>
              <span className="text-sm text-gray-500">• Click filter icons to filter columns</span>
            </div>
            <div className="flex items-center gap-2">
              {['all', 'critical', 'warning', 'top10'].map(filter => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                    activeFilter === filter
                      ? filter === 'critical' ? 'bg-red-100 text-red-700' :
                        filter === 'warning' ? 'bg-amber-100 text-amber-700' :
                        `${colors.bg} ${colors.text}`
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {filter === 'all' ? 'All' : filter === 'critical' ? '◆ Critical' : filter === 'warning' ? '↘ Warning' : '⚡ Top 10%'}
                </button>
              ))}
            </div>
          </div>

          {/* Table Header */}
          <div className="grid grid-cols-8 gap-4 px-5 py-3 bg-gray-50 text-xs font-medium text-gray-500 uppercase tracking-wide border-b border-gray-100">
            <span className="flex items-center gap-1">Rank <Filter className="w-3 h-3" /></span>
            <span className="flex items-center gap-1">Wallet <Filter className="w-3 h-3" /></span>
            <span className="flex items-center gap-1">30d Volume <Filter className="w-3 h-3" /></span>
            <span className="flex items-center gap-1">Current Week <Filter className="w-3 h-3" /></span>
            <span className="flex items-center gap-1">Prior Week <Filter className="w-3 h-3" /></span>
            <span className="flex items-center gap-1">Decline % <Filter className="w-3 h-3" /></span>
            <span className="flex items-center gap-1">Risk Level <Filter className="w-3 h-3" /></span>
            <span>Days Since Peak</span>
          </div>

          {/* Table Rows */}
          {filteredUsers.map((user, i) => (
            <div key={i} className="grid grid-cols-8 gap-4 px-5 py-3 border-b border-gray-100 hover:bg-gray-50 transition-colors">
              <span className="text-sm text-gray-500">#{user.rank}</span>
              <div className="flex items-center gap-2">
                <span className="font-mono text-sm text-violet-600">{user.wallet}</span>
                <ExternalLink className="w-3 h-3 text-gray-400" />
              </div>
              <span className="text-sm font-medium text-gray-900">{user.volume30d}</span>
              <span className="text-sm text-gray-600">{user.currentWeek}</span>
              <span className="text-sm text-gray-600">{user.priorWeek}</span>
              <span className="text-sm font-semibold text-red-600 flex items-center gap-1">
                <TrendingDown className="w-3 h-3" /> {user.decline}
              </span>
              <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium w-fit ${
                user.risk === 'critical' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'
              }`}>
                {user.risk}
              </span>
              <span className="text-sm text-gray-600">{user.daysSincePeak}d</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Message component for chat
const Message = ({
  role,
  content,
  data,
  actions,
  onSaveSegment,
  onCreateCampaign,
  onShowAll,
  onExport,
  onShare,
  onInvestigate,
  onViewSegmentDetail
}) => (
  <div className={`flex gap-4 ${role === 'user' ? 'flex-row-reverse' : ''}`}>
    {role === 'assistant' && (
      <div className="flex-shrink-0 w-10 h-10 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-sm">
        <Sparkles className="w-5 h-5 text-white" />
      </div>
    )}

    <div className={`max-w-[85%] space-y-3`}>
      <div className={`px-5 py-4 rounded-2xl text-[15px] leading-relaxed ${
        role === 'user'
          ? 'bg-violet-600 text-white rounded-br-md'
          : 'bg-white border border-gray-200 text-gray-700 rounded-bl-md shadow-sm'
      }`}>
        {content}
      </div>

      {/* Opportunity Type - Special Rendering */}
      {data && data.type === 'opportunity' && (
        <div className={`bg-white border rounded-2xl overflow-hidden shadow-sm ${
          data.color === 'red' ? 'border-red-200' : data.color === 'emerald' ? 'border-emerald-200' : 'border-amber-200'
        }`}>
          {/* Header */}
          <div className={`px-5 py-4 ${
            data.color === 'red' ? 'bg-red-50' : data.color === 'emerald' ? 'bg-emerald-50' : 'bg-amber-50'
          }`}>
            <div className="flex items-start gap-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                data.color === 'red' ? 'bg-red-100' : data.color === 'emerald' ? 'bg-emerald-100' : 'bg-amber-100'
              }`}>
                {data.color === 'red' ? (
                  <AlertTriangle className="w-5 h-5 text-red-600" />
                ) : data.color === 'emerald' ? (
                  <TrendingUp className="w-5 h-5 text-emerald-600" />
                ) : (
                  <UserX className="w-5 h-5 text-amber-600" />
                )}
              </div>
              <div>
                <h3 className={`text-lg font-bold ${
                  data.color === 'red' ? 'text-red-900' : data.color === 'emerald' ? 'text-emerald-900' : 'text-amber-900'
                }`}>{data.title}</h3>
                <p className={`text-sm ${
                  data.color === 'red' ? 'text-red-700' : data.color === 'emerald' ? 'text-emerald-700' : 'text-amber-700'
                }`}>{data.subtitle}</p>
              </div>
            </div>
          </div>

          {/* Stats */}
          {data.stats && (
            <div className="grid grid-cols-3 divide-x divide-gray-100 border-b border-gray-100">
              {data.stats.map((stat, i) => (
                <div key={i} className="px-5 py-4 text-center">
                  <div className={`text-2xl font-bold ${
                    data.color === 'red' ? 'text-red-600' : data.color === 'emerald' ? 'text-emerald-600' : 'text-amber-600'
                  }`}>{stat.value}</div>
                  <div className="text-xs text-gray-500 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          )}

          {/* Explanation */}
          {data.explanation && (
            <div className="px-5 py-4 space-y-3 border-b border-gray-100">
              {data.explanation.map((para, i) => (
                <p key={i} className="text-sm text-gray-700 leading-relaxed"
                   dangerouslySetInnerHTML={{
                     __html: para.replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-gray-900">$1</strong>')
                   }}
                />
              ))}
            </div>
          )}

          {/* Benchmark */}
          {data.benchmark && (
            <div className={`px-5 py-3 flex items-start gap-2 border-b border-gray-100 ${
              data.color === 'red' ? 'bg-red-50/50' : data.color === 'emerald' ? 'bg-emerald-50/50' : 'bg-amber-50/50'
            }`}>
              <Sparkles className={`w-4 h-4 mt-0.5 flex-shrink-0 ${
                data.color === 'red' ? 'text-red-500' : data.color === 'emerald' ? 'text-emerald-500' : 'text-amber-500'
              }`} />
              <p className="text-xs text-gray-600 italic">{data.benchmark}</p>
            </div>
          )}

          {/* Sample Users */}
          {data.users && (
            <div className="border-b border-gray-100">
              <div className="px-5 py-2 bg-gray-50 text-xs font-medium text-gray-500 uppercase tracking-wide">
                Sample Users
              </div>
              {data.users.slice(0, 3).map((user, i) => (
                <div key={i} className="grid grid-cols-4 gap-4 px-5 py-2.5 hover:bg-gray-50 transition-colors border-t border-gray-100">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-sm text-violet-600">{user.wallet}</span>
                    <ExternalLink className="w-3 h-3 text-gray-400" />
                  </div>
                  <span className="text-sm text-gray-900 font-medium">{user.current}</span>
                  <span className="text-sm text-gray-500">{user.was}</span>
                  <span className={`text-sm font-semibold text-right ${user.change.startsWith('-') || user.change === '-100%' ? 'text-red-600' : 'text-emerald-600'}`}>
                    {user.change}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Actions */}
          <div className="px-5 py-4 flex gap-3 bg-gray-50">
            <button
              onClick={onShowAll}
              className="flex-1 py-2.5 px-4 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 text-sm font-medium rounded-xl transition-colors flex items-center justify-center gap-2"
            >
              <Eye className="w-4 h-4" />
              View Details
            </button>
            <button
              onClick={onCreateCampaign}
              className={`flex-1 py-2.5 px-4 text-white text-sm font-medium rounded-xl transition-colors flex items-center justify-center gap-2 ${
                data.color === 'red' ? 'bg-red-600 hover:bg-red-700' : data.color === 'emerald' ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-amber-600 hover:bg-amber-700'
              }`}
            >
              <Rocket className="w-4 h-4" />
              {data.cta}
            </button>
          </div>
        </div>
      )}

      {/* Segment Type - Summary Card */}
      {data && data.type === 'segment' && (
        <div className={`bg-white border rounded-2xl overflow-hidden shadow-sm ${
          data.color === 'red' ? 'border-red-200' :
          data.color === 'emerald' ? 'border-emerald-200' :
          data.color === 'violet' ? 'border-violet-200' :
          data.color === 'blue' ? 'border-blue-200' : 'border-gray-200'
        }`}>
          {/* Header */}
          <div className={`px-5 py-4 ${
            data.color === 'red' ? 'bg-red-50' :
            data.color === 'emerald' ? 'bg-emerald-50' :
            data.color === 'violet' ? 'bg-violet-50' :
            data.color === 'blue' ? 'bg-blue-50' : 'bg-gray-50'
          }`}>
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  data.color === 'red' ? 'bg-red-100' :
                  data.color === 'emerald' ? 'bg-emerald-100' :
                  data.color === 'violet' ? 'bg-violet-100' :
                  data.color === 'blue' ? 'bg-blue-100' : 'bg-gray-100'
                }`}>
                  <Layers className={`w-5 h-5 ${
                    data.color === 'red' ? 'text-red-600' :
                    data.color === 'emerald' ? 'text-emerald-600' :
                    data.color === 'violet' ? 'text-violet-600' :
                    data.color === 'blue' ? 'text-blue-600' : 'text-gray-600'
                  }`} />
                </div>
                <div>
                  <h3 className={`text-lg font-bold ${
                    data.color === 'red' ? 'text-red-900' :
                    data.color === 'emerald' ? 'text-emerald-900' :
                    data.color === 'violet' ? 'text-violet-900' :
                    data.color === 'blue' ? 'text-blue-900' : 'text-gray-900'
                  }`}>{data.name}</h3>
                  <p className={`text-sm ${
                    data.color === 'red' ? 'text-red-700' :
                    data.color === 'emerald' ? 'text-emerald-700' :
                    data.color === 'violet' ? 'text-violet-700' :
                    data.color === 'blue' ? 'text-blue-700' : 'text-gray-600'
                  }`}>{data.description}</p>
                </div>
              </div>
              <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                data.color === 'red' ? 'bg-red-100 text-red-700' :
                data.color === 'emerald' ? 'bg-emerald-100 text-emerald-700' :
                data.color === 'violet' ? 'bg-violet-100 text-violet-700' :
                data.color === 'blue' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'
              }`}>Segment</span>
            </div>
          </div>

          {/* Stats */}
          {data.stats && (
            <div className="grid grid-cols-3 divide-x divide-gray-100 border-b border-gray-100">
              {data.stats.map((stat, i) => (
                <div key={i} className="px-4 py-4 text-center">
                  <div className={`text-2xl font-bold ${
                    data.color === 'red' ? 'text-red-600' :
                    data.color === 'emerald' ? 'text-emerald-600' :
                    data.color === 'violet' ? 'text-violet-600' :
                    data.color === 'blue' ? 'text-blue-600' : 'text-gray-900'
                  }`}>{stat.value}</div>
                  <div className="text-xs font-medium text-gray-700 mt-0.5">{stat.label}</div>
                  {stat.sublabel && <div className="text-xs text-gray-500">{stat.sublabel}</div>}
                </div>
              ))}
            </div>
          )}

          {/* Breakdown Pills */}
          {data.breakdown && (
            <div className="px-5 py-3 border-b border-gray-100 flex items-center gap-3">
              {data.breakdown.map((item, i) => (
                <div key={i} className={`flex items-center gap-2 px-3 py-1.5 rounded-full ${
                  item.color === 'red' ? 'bg-red-50 border border-red-200' :
                  item.color === 'amber' ? 'bg-amber-50 border border-amber-200' :
                  item.color === 'emerald' ? 'bg-emerald-50 border border-emerald-200' :
                  item.color === 'green' ? 'bg-green-50 border border-green-200' :
                  item.color === 'violet' ? 'bg-violet-50 border border-violet-200' :
                  item.color === 'purple' ? 'bg-purple-50 border border-purple-200' :
                  item.color === 'blue' ? 'bg-blue-50 border border-blue-200' :
                  item.color === 'sky' ? 'bg-sky-50 border border-sky-200' :
                  'bg-gray-50 border border-gray-200'
                }`}>
                  <span className={`text-sm font-semibold ${
                    item.color === 'red' ? 'text-red-700' :
                    item.color === 'amber' ? 'text-amber-700' :
                    item.color === 'emerald' ? 'text-emerald-700' :
                    item.color === 'green' ? 'text-green-700' :
                    item.color === 'violet' ? 'text-violet-700' :
                    item.color === 'purple' ? 'text-purple-700' :
                    item.color === 'blue' ? 'text-blue-700' :
                    item.color === 'sky' ? 'text-sky-700' :
                    'text-gray-700'
                  }`}>{item.value.toLocaleString()}</span>
                  <span className="text-xs text-gray-600">{item.label}</span>
                </div>
              ))}
            </div>
          )}

          {/* Insight */}
          {data.insight && (
            <div className={`px-5 py-3 flex items-start gap-2 border-b border-gray-100 ${
              data.color === 'red' ? 'bg-red-50/50' :
              data.color === 'emerald' ? 'bg-emerald-50/50' :
              data.color === 'violet' ? 'bg-violet-50/50' :
              data.color === 'blue' ? 'bg-blue-50/50' : 'bg-gray-50/50'
            }`}>
              <Lightbulb className={`w-4 h-4 mt-0.5 flex-shrink-0 ${
                data.color === 'red' ? 'text-red-500' :
                data.color === 'emerald' ? 'text-emerald-500' :
                data.color === 'violet' ? 'text-violet-500' :
                data.color === 'blue' ? 'text-blue-500' : 'text-gray-500'
              }`} />
              <p className="text-xs text-gray-600 leading-relaxed">{data.insight}</p>
            </div>
          )}

          {/* Sample Users Preview */}
          {data.users && (
            <div className="border-b border-gray-100">
              <div className="px-5 py-2 bg-gray-50 text-xs font-medium text-gray-500 uppercase tracking-wide flex items-center justify-between">
                <span>Top Users</span>
                <span className="text-gray-400 font-normal normal-case">Showing 3 of {data.stats?.[0]?.value || 'many'}</span>
              </div>
              {data.users.slice(0, 3).map((user, i) => (
                <div key={i} className="flex items-center justify-between px-5 py-2.5 hover:bg-gray-50 transition-colors border-t border-gray-100">
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-gray-400 w-4">#{user.rank}</span>
                    <span className="font-mono text-sm text-violet-600">{user.wallet}</span>
                    <ExternalLink className="w-3 h-3 text-gray-400" />
                  </div>
                  <div className="flex items-center gap-4">
                    {user.volume30d && <span className="text-sm text-gray-600">{user.volume30d}</span>}
                    {user.decline && (
                      <span className="text-sm font-semibold text-red-600">{user.decline}</span>
                    )}
                    {user.growth && (
                      <span className="text-sm font-semibold text-emerald-600">{user.growth}</span>
                    )}
                    {user.risk && (
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                        user.risk === 'critical' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'
                      }`}>{user.risk}</span>
                    )}
                    {user.potential && (
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                        user.potential === 'high' ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-600'
                      }`}>{user.potential}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Actions */}
          <div className="px-5 py-4 flex gap-3 bg-gray-50">
            <button
              onClick={() => onViewSegmentDetail && onViewSegmentDetail(data)}
              className={`flex-1 py-2.5 px-4 text-white text-sm font-medium rounded-xl transition-colors flex items-center justify-center gap-2 ${
                data.color === 'red' ? 'bg-red-600 hover:bg-red-700' :
                data.color === 'emerald' ? 'bg-emerald-600 hover:bg-emerald-700' :
                data.color === 'violet' ? 'bg-violet-600 hover:bg-violet-700' :
                data.color === 'blue' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-600 hover:bg-gray-700'
              }`}
            >
              <BarChart2 className="w-4 h-4" />
              View Full Analysis
            </button>
            <button
              onClick={onCreateCampaign}
              className="flex-1 py-2.5 px-4 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 text-sm font-medium rounded-xl transition-colors flex items-center justify-center gap-2"
            >
              <Gift className="w-4 h-4" />
              Create Campaign
            </button>
            <button
              onClick={onExport}
              className="py-2.5 px-4 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 text-sm font-medium rounded-xl transition-colors flex items-center justify-center"
            >
              <Download className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Regular Data Types */}
      {data && data.type !== 'opportunity' && data.type !== 'segment' && (
        <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
          <div className="px-5 py-3 border-b border-gray-100 flex items-center justify-between bg-gray-50">
            <div className="flex items-center gap-2">
              {data.type === 'segment_saved' ? (
                <Layers className="w-4 h-4 text-emerald-500" />
              ) : data.type === 'campaign_launched' ? (
                <Play className="w-4 h-4 text-emerald-500" />
              ) : data.type === 'campaign_performance' ? (
                <Target className="w-4 h-4 text-violet-500" />
              ) : data.type === 'analysis' ? (
                <BarChart className="w-4 h-4 text-blue-500" />
              ) : (
                <AlertTriangle className="w-4 h-4 text-amber-500" />
              )}
              <span className="text-sm font-semibold text-gray-900">{data.title}</span>
            </div>
            {(data.urgency || data.status) && (
              <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                data.type === 'segment_saved' || data.type === 'campaign_launched'
                  ? 'text-emerald-600 bg-emerald-50'
                  : data.type === 'campaign_performance'
                  ? 'text-violet-600 bg-violet-50'
                  : data.type === 'analysis'
                  ? 'text-blue-600 bg-blue-50'
                  : 'text-red-600 bg-red-50'
              }`}>{data.urgency || data.status}</span>
            )}
          </div>

          {data.stats && (
            <div className="grid grid-cols-3 divide-x divide-gray-100 border-b border-gray-100">
              {data.stats.map((stat, i) => (
                <div key={i} className="px-5 py-4 text-center">
                  <div className={`text-2xl font-bold ${stat.color || 'text-gray-900'}`}>{stat.value}</div>
                  <div className="text-xs text-gray-500 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          )}

          {data.users && (
            <div className="divide-y divide-gray-100">
              <div className="grid grid-cols-4 gap-4 px-5 py-2.5 bg-gray-50 text-xs font-medium text-gray-500 uppercase tracking-wide">
                <span>Wallet</span>
                <span>Current</span>
                <span>Was</span>
                <span className="text-right">Change</span>
              </div>
              {data.users.slice(0, 3).map((user, i) => (
                <div key={i} className="grid grid-cols-4 gap-4 px-5 py-3 hover:bg-gray-50 transition-colors cursor-pointer">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-sm text-violet-600">{user.wallet}</span>
                    <ExternalLink className="w-3 h-3 text-gray-400" />
                  </div>
                  <span className="text-sm text-gray-900 font-medium">{user.current}</span>
                  <span className="text-sm text-gray-500">{user.was}</span>
                  <span className={`text-sm font-semibold text-right ${user.change.startsWith('-') ? 'text-red-600' : 'text-emerald-600'}`}>
                    {user.change}
                  </span>
                </div>
              ))}
              {data.users.length > 3 && (
                <button
                  onClick={onShowAll}
                  className="w-full px-5 py-3 text-sm text-violet-600 font-medium hover:bg-violet-50 transition-colors flex items-center justify-center gap-2"
                >
                  <Eye className="w-4 h-4" />
                  Show All {data.userCount || 12} Users
                </button>
              )}
            </div>
          )}

          {/* Campaign Performance Section */}
          {data.type === 'campaign_performance' && data.comparison && (
            <div className="divide-y divide-gray-100">
              {/* Header Stats */}
              {data.headerStats && (
                <div className="px-5 py-4 grid grid-cols-3 gap-4">
                  {data.headerStats.map((stat, i) => (
                    <div key={i} className="text-center">
                      <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                      <div className="text-xs text-gray-500 mt-0.5">{stat.label}</div>
                    </div>
                  ))}
                </div>
              )}

              {/* Recipients vs Non-Recipients Comparison */}
              <div className="px-5 py-4">
                <div className="text-xs text-gray-500 uppercase tracking-wide mb-3">Recipients vs Non-Recipients</div>
                <div className="grid grid-cols-2 gap-4">
                  {/* Recipients Card */}
                  <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-semibold text-emerald-800">Recipients</span>
                      <span className="text-xs font-medium text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded-full">{data.comparison.recipients.count} users</span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-xs text-emerald-700">Avg Volume Before</span>
                        <span className="text-sm font-medium text-emerald-900">{data.comparison.recipients.avgVolumeBefore}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-xs text-emerald-700">Avg Volume Now</span>
                        <span className="text-sm font-bold text-emerald-900">{data.comparison.recipients.avgVolumeNow}</span>
                      </div>
                      <div className="flex justify-between pt-2 border-t border-emerald-200">
                        <span className="text-xs text-emerald-700">Volume Lift</span>
                        <span className="text-sm font-bold text-emerald-600">{data.comparison.recipients.lift}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-xs text-emerald-700">Total Volume Driven</span>
                        <span className="text-sm font-bold text-emerald-900">{data.comparison.recipients.totalVolume}</span>
                      </div>
                    </div>
                  </div>
                  {/* Non-Recipients Card */}
                  <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-semibold text-gray-700">Non-Recipients</span>
                      <span className="text-xs font-medium text-gray-500 bg-gray-200 px-2 py-0.5 rounded-full">{data.comparison.nonRecipients.count} users</span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-xs text-gray-500">Avg Volume Before</span>
                        <span className="text-sm font-medium text-gray-700">{data.comparison.nonRecipients.avgVolumeBefore}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-xs text-gray-500">Avg Volume Now</span>
                        <span className="text-sm font-bold text-gray-700">{data.comparison.nonRecipients.avgVolumeNow}</span>
                      </div>
                      <div className="flex justify-between pt-2 border-t border-gray-200">
                        <span className="text-xs text-gray-500">Volume Lift</span>
                        <span className="text-sm font-bold text-gray-500">{data.comparison.nonRecipients.lift}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-xs text-gray-500">Total Volume</span>
                        <span className="text-sm font-bold text-gray-700">{data.comparison.nonRecipients.totalVolume}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Volume Comparison Chart */}
              {data.chartData?.recipients && (
                <div className="px-5 py-4">
                  <div className="text-xs text-gray-500 uppercase tracking-wide mb-3">Avg Volume Over Time ($K)</div>
                  <div className="h-36 flex items-end gap-3">
                    {data.chartData.recipients.map((value, i) => {
                      const maxVal = Math.max(...data.chartData.recipients, ...data.chartData.nonRecipients);
                      const recipientHeight = (value / maxVal) * 100;
                      const nonRecipientHeight = (data.chartData.nonRecipients[i] / maxVal) * 100;
                      return (
                        <div key={i} className="flex-1 flex flex-col items-center gap-1">
                          <div className="w-full flex gap-1 items-end h-28">
                            <div
                              className="flex-1 bg-gradient-to-t from-emerald-500 to-emerald-400 rounded-t-sm"
                              style={{ height: `${recipientHeight}%` }}
                              title={`Recipients: $${value}K`}
                            />
                            <div
                              className="flex-1 bg-gradient-to-t from-gray-400 to-gray-300 rounded-t-sm"
                              style={{ height: `${nonRecipientHeight}%` }}
                              title={`Non-recipients: $${data.chartData.nonRecipients[i]}K`}
                            />
                          </div>
                          <span className="text-[10px] text-gray-500">{data.dailyData?.[i]?.date?.split(' ')[1] || `Day ${i+1}`}</span>
                        </div>
                      );
                    })}
                  </div>
                  <div className="flex items-center justify-center gap-6 mt-3">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-sm bg-emerald-500" />
                      <span className="text-xs text-gray-600">Recipients</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-sm bg-gray-400" />
                      <span className="text-xs text-gray-600">Non-Recipients</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Daily Rewards Distribution */}
              {data.dailyData && (
                <div>
                  <div className="grid grid-cols-4 gap-4 px-5 py-2.5 bg-gray-50 text-xs font-medium text-gray-500 uppercase tracking-wide">
                    <span>Day</span>
                    <span>Recipients</span>
                    <span>Rewards</span>
                    <span className="text-right">Volume</span>
                  </div>
                  {data.dailyData.map((day, i) => (
                    <div key={i} className="grid grid-cols-4 gap-4 px-5 py-3 border-t border-gray-100 hover:bg-gray-50">
                      <span className="text-sm text-gray-900">{day.date}</span>
                      <span className="text-sm text-gray-900">{day.recipients} users</span>
                      <span className="text-sm font-medium text-violet-600">{day.amount}</span>
                      <span className="text-sm font-medium text-emerald-600 text-right">{day.volume}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Top Recipients */}
              {data.topRecipients && (
                <div>
                  <div className="px-5 py-2.5 bg-gray-50 text-xs font-medium text-gray-500 uppercase tracking-wide">
                    Top Reward Recipients
                  </div>
                  <div className="grid grid-cols-5 gap-2 px-5 py-2 bg-gray-50 text-xs font-medium text-gray-500 uppercase tracking-wide border-t border-gray-100">
                    <span>Wallet</span>
                    <span>Rewards</span>
                    <span>Before</span>
                    <span>Now</span>
                    <span className="text-right">Lift</span>
                  </div>
                  {data.topRecipients.map((recipient, i) => (
                    <div key={i} className="grid grid-cols-5 gap-2 px-5 py-3 border-t border-gray-100 hover:bg-gray-50">
                      <span className="font-mono text-sm text-violet-600">{recipient.wallet}</span>
                      <span className="text-sm font-medium text-violet-600">{recipient.rewards}</span>
                      <span className="text-sm text-gray-500">{recipient.volumeBefore}</span>
                      <span className="text-sm font-medium text-gray-900">{recipient.volumeNow}</span>
                      <span className="text-sm font-semibold text-emerald-600 text-right">{recipient.lift}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Campaign Actions */}
              <div className="px-5 py-4 flex gap-2 bg-gray-50">
                <button className="flex-1 py-2.5 px-4 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 text-sm font-medium rounded-xl transition-colors flex items-center justify-center gap-2">
                  <Pause className="w-4 h-4" />
                  Pause Campaign
                </button>
                <button className="flex-1 py-2.5 px-4 bg-violet-600 hover:bg-violet-700 text-white text-sm font-medium rounded-xl transition-colors flex items-center justify-center gap-2">
                  <Edit3 className="w-4 h-4" />
                  Edit Campaign
                </button>
              </div>
            </div>
          )}

          {/* Primary Actions Row */}
          {actions && (
            <div className="px-5 py-4 flex flex-wrap gap-2 bg-gray-50 border-t border-gray-100">
              <button
                onClick={onShowAll}
                className="py-2 px-4 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 text-sm font-medium rounded-xl transition-colors flex items-center gap-2"
              >
                <Eye className="w-4 h-4" />
                Show All 12
              </button>
              <button
                onClick={onSaveSegment}
                className="py-2 px-4 bg-violet-600 hover:bg-violet-700 text-white text-sm font-medium rounded-xl transition-colors flex items-center gap-2"
              >
                <Layers className="w-4 h-4" />
                Save as Segment
              </button>
              <button
                onClick={onCreateCampaign}
                className="py-2 px-4 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium rounded-xl transition-colors flex items-center gap-2"
              >
                <Gift className="w-4 h-4" />
                Create Campaign
              </button>
            </div>
          )}

          {/* Secondary Actions Row (for analytics-type responses) */}
          {data.type === 'analysis' && (
            <div className="px-5 py-3 flex gap-2 border-t border-gray-100">
              <button
                onClick={onExport}
                className="py-2 px-3 bg-white border border-gray-200 hover:bg-gray-50 text-gray-600 text-sm font-medium rounded-lg transition-colors flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Export Report
              </button>
              <button
                onClick={onShare}
                className="py-2 px-3 bg-white border border-gray-200 hover:bg-gray-50 text-gray-600 text-sm font-medium rounded-lg transition-colors flex items-center gap-2"
              >
                <Share2 className="w-4 h-4" />
                Share
              </button>
              <button
                onClick={() => {}}
                className="py-2 px-3 bg-white border border-gray-200 hover:bg-gray-50 text-gray-600 text-sm font-medium rounded-lg transition-colors flex items-center gap-2"
              >
                <BarChart className="w-4 h-4" />
                Add to Dashboard
              </button>
            </div>
          )}

          {/* Investigate More for segment results */}
          {actions && (
            <div className="px-5 py-3 border-t border-gray-100">
              <button
                onClick={onInvestigate}
                className="w-full py-2.5 px-4 border border-dashed border-gray-300 hover:border-violet-400 hover:bg-violet-50 text-gray-600 hover:text-violet-700 text-sm font-medium rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                <Lightbulb className="w-4 h-4" />
                Investigate More
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  </div>
);

// Quick prompt button
const QuickPrompt = ({ text, onClick, icon: Icon, delay = 0 }) => (
  <button
    onClick={onClick}
    style={{ animationDelay: `${delay}ms` }}
    className="group relative w-full text-left p-4 bg-white/70 backdrop-blur-sm border border-gray-200/60 rounded-2xl text-sm text-gray-600 hover:bg-white hover:border-violet-300/60 hover:shadow-lg hover:shadow-violet-100/50 hover:-translate-y-0.5 transition-all duration-300 ease-out animate-[fadeSlideUp_0.5s_ease-out_both]"
  >
    <div className="flex items-start gap-3">
      <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 group-hover:from-violet-50 group-hover:to-violet-100 flex items-center justify-center flex-shrink-0 transition-colors duration-300">
        <Icon className="w-4 h-4 text-gray-400 group-hover:text-violet-500 transition-colors duration-300" />
      </div>
      <span className="pt-1 leading-relaxed group-hover:text-gray-800 transition-colors">{text}</span>
    </div>
    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-violet-500/0 via-violet-500/0 to-violet-500/0 group-hover:from-violet-500/5 group-hover:via-transparent group-hover:to-violet-500/5 transition-all duration-500" />
  </button>
);

// ============================================
// CRM VIEW COMPONENTS
// ============================================

// Filter dropdown
const FilterDropdown = ({ label, options, value, onChange, icon: Icon }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-sm font-medium transition-all ${
          value ? 'bg-violet-50 border-violet-300 text-violet-700' : 'bg-white border-gray-200 text-gray-700 hover:border-gray-300'
        }`}
      >
        {Icon && <Icon className="w-4 h-4" />}
        {value || label}
        <ChevronDown className={`w-4 h-4 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="absolute top-full left-0 mt-1 w-48 bg-white border border-gray-200 rounded-xl shadow-lg z-20 py-1 max-h-64 overflow-y-auto">
            <button
              onClick={() => { onChange(''); setOpen(false); }}
              className="w-full text-left px-4 py-2 text-sm text-gray-500 hover:bg-gray-50"
            >
              All
            </button>
            {options.map(opt => (
              <button
                key={opt.value}
                onClick={() => { onChange(opt.value); setOpen(false); }}
                className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 flex items-center justify-between ${
                  value === opt.value ? 'bg-violet-50 text-violet-700' : 'text-gray-700'
                }`}
              >
                {opt.label}
                {opt.count && <span className="text-xs text-gray-400">{opt.count}</span>}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

// User row
const UserRow = ({ user, selected, onSelect, onClick }) => {
  const trendColor = user.trend > 0 ? 'green' : user.trend < 0 ? 'red' : 'gray';

  return (
    <tr
      className={`border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors ${selected ? 'bg-violet-50' : ''}`}
      onClick={onClick}
    >
      <td className="px-4 py-3" onClick={e => e.stopPropagation()}>
        <input
          type="checkbox"
          checked={selected}
          onChange={onSelect}
          className="w-4 h-4 rounded border-gray-300 text-violet-600 focus:ring-violet-500"
        />
      </td>
      <td className="px-4 py-3">
        <span className="font-mono text-sm text-violet-600 font-medium">{user.wallet}</span>
      </td>
      <td className="px-4 py-3">
        <div className="flex items-center gap-3">
          <span className="text-sm font-semibold text-gray-900">{user.volume}</span>
          <span className={`text-xs font-medium flex items-center ${
            user.trend > 0 ? 'text-emerald-600' : user.trend < 0 ? 'text-red-600' : 'text-gray-400'
          }`}>
            {user.trend > 0 ? <ArrowUpRight className="w-3 h-3" /> : user.trend < 0 ? <ArrowDownRight className="w-3 h-3" /> : <Minus className="w-3 h-3" />}
            {Math.abs(user.trend)}%
          </span>
        </div>
      </td>
      <td className="px-4 py-3">
        <MiniSparkline data={user.activityData} color={trendColor} />
      </td>
      <td className="px-4 py-3">
        <div className="flex flex-wrap gap-1">
          {user.segments.map((seg, i) => (
            <SegmentTag key={i} {...seg} />
          ))}
        </div>
      </td>
      <td className="px-4 py-3">
        <HealthBadge status={user.health} />
      </td>
      <td className="px-4 py-3">
        <span className="text-sm text-gray-500">{user.lastActive}</span>
      </td>
      <td className="px-4 py-3">
        <button className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
          <MoreHorizontal className="w-4 h-4 text-gray-400" />
        </button>
      </td>
    </tr>
  );
};

// User Profile Drawer (full version)
const UserProfileDrawer = ({ user, onClose, onAskAI }) => {
  const [activeTab, setActiveTab] = useState('activity');

  if (!user) return null;

  const holdings = [
    { token: 'SOL', amount: '1,245', value: '$142,500', pct: 45 },
    { token: 'USDC', amount: '85,000', value: '$85,000', pct: 27 },
    { token: 'RAY', amount: '12,500', value: '$52,000', pct: 16 },
    { token: 'TORQ', amount: '50,000', value: '$38,000', pct: 12 },
  ];

  const userSegments = user.segments || [];

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-black/30" onClick={onClose} />
      <div className="relative w-full max-w-2xl bg-white shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-white">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <button onClick={onClose} className="flex items-center gap-1 hover:text-gray-700">
              <ChevronLeft className="w-4 h-4" />
              Back
            </button>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white text-sm font-medium rounded-lg transition-colors">
            <Plus className="w-4 h-4" />
            Add to List
          </button>
        </div>

        {/* User Identity */}
        <div className="px-6 py-4 border-b border-gray-100">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white font-bold text-lg shadow-lg">
              #{user.rank || '—'}
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="font-mono font-bold text-xl text-gray-900">{user.wallet}</span>
                <button className="p-1 hover:bg-gray-100 rounded">
                  <Copy className="w-4 h-4 text-gray-400" />
                </button>
                <button className="p-1 hover:bg-gray-100 rounded">
                  <ExternalLink className="w-4 h-4 text-gray-400" />
                </button>
              </div>
              <p className="text-sm text-gray-500 mt-1">
                First seen about 1 month ago • {user.lastActive} active
              </p>

              {/* Segments */}
              <div className="flex items-center gap-2 mt-3 flex-wrap">
                {userSegments.map((seg, i) => {
                  const icons = { whale: '🐋', rising: '⭐', loyal: '💎', new: '🆕', lp: '💧' };
                  return (
                    <span
                      key={i}
                      className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-100 text-emerald-700 rounded-lg text-sm font-medium border border-emerald-200"
                    >
                      {icons[seg.icon] || '📌'} {seg.name}
                      <button className="ml-1 hover:bg-emerald-200 rounded p-0.5">
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  );
                })}
                <button className="inline-flex items-center gap-1.5 px-3 py-1 border border-dashed border-gray-300 text-gray-500 rounded-lg text-sm font-medium hover:border-gray-400 hover:text-gray-600 transition-colors">
                  <Plus className="w-3 h-3" />
                  Add Tag
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards Row */}
        <div className="px-6 py-4 border-b border-gray-100 grid grid-cols-5 gap-3">
          <div className="bg-gray-50 rounded-xl p-3 border border-gray-200">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-gray-500">Volume (30d)</span>
              <BarChart2 className="w-3.5 h-3.5 text-gray-400" />
            </div>
            <div className="text-lg font-bold text-emerald-600">{user.volume}</div>
            <div className="text-xs text-gray-400">top 5% of users</div>
          </div>

          <div className="bg-gray-50 rounded-xl p-3 border border-gray-200">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-gray-500">Total Actions</span>
              <Zap className="w-3.5 h-3.5 text-gray-400" />
            </div>
            <div className="text-lg font-bold text-gray-900">15.5K</div>
            <div className="text-xs text-gray-400">166 vs yesterday</div>
          </div>

          <div className="bg-gray-50 rounded-xl p-3 border border-gray-200">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-gray-500">Campaigns</span>
              <Gift className="w-3.5 h-3.5 text-gray-400" />
            </div>
            <div className="text-lg font-bold text-gray-900">67</div>
            <div className="text-xs text-gray-400">98.5% claimed</div>
          </div>

          <div className="bg-gray-50 rounded-xl p-3 border border-gray-200">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-gray-500">User Rank</span>
              <TrendingUp className="w-3.5 h-3.5 text-amber-500" />
            </div>
            <div className="text-lg font-bold text-amber-500">#{user.rank || 2}</div>
            <div className="text-xs text-gray-400">by activity</div>
          </div>

          <div className="bg-gray-50 rounded-xl p-3 border border-gray-200">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-gray-500">Median Reward</span>
              <Gift className="w-3.5 h-3.5 text-emerald-500" />
            </div>
            <div className="text-lg font-bold text-gray-900">$0</div>
            <div className="text-xs text-gray-400">per campaign</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="px-6 border-b border-gray-200">
          <div className="flex gap-6">
            {[
              { id: 'activity', label: 'Protocol Activity' },
              { id: 'holdings', label: 'Token Holdings' },
              { id: 'incentives', label: 'Incentives' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-3 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-violet-600 text-violet-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="flex">
            <div className="flex-1 p-6">
              {activeTab === 'activity' && (
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Activity className="w-5 h-5 text-violet-600" />
                    <h3 className="font-semibold text-gray-900">Protocol Activity</h3>
                    <span className="text-sm text-gray-500">(30 days)</span>
                  </div>

                  <div className="grid grid-cols-4 gap-3 mb-6">
                    <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                      <div className="text-xs text-gray-500 mb-1">TOTAL TX</div>
                      <div className="text-xl font-bold text-gray-900">15.5K</div>
                      <div className="text-xs text-gray-400">~518/day</div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                      <div className="text-xs text-gray-500 mb-1">ACTIONS</div>
                      <div className="flex items-center gap-1 mt-1">
                        <div className="h-2 bg-emerald-400 rounded" style={{ width: '40%' }} />
                        <div className="h-2 bg-blue-400 rounded" style={{ width: '30%' }} />
                        <div className="h-2 bg-amber-400 rounded" style={{ width: '30%' }} />
                      </div>
                      <div className="text-xs text-gray-400 mt-2">sell 40% • buy 30%</div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                      <div className="text-xs text-gray-500 mb-1">TREND</div>
                      <div className={`text-xl font-bold ${user.trend < 0 ? 'text-red-500' : 'text-emerald-500'}`}>
                        {user.trend < 0 ? '↓' : '↑'} {Math.abs(user.trend)}%
                      </div>
                      <div className="text-xs text-gray-400">vs prior 7 days</div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                      <div className="text-xs text-gray-500 mb-1">ACTIVE</div>
                      <div className="text-xl font-bold text-gray-900">30<span className="text-gray-400">/30</span></div>
                      <div className="text-xs text-gray-400">100% consistency</div>
                    </div>
                  </div>

                  <div className="h-32 flex items-end gap-0.5 mb-2">
                    {Array.from({ length: 30 }, (_, i) => {
                      const height = Math.random() * 80 + 20;
                      const isHighlight = i === 17;
                      return (
                        <div
                          key={i}
                          className={`flex-1 rounded-t transition-colors ${
                            isHighlight ? 'bg-emerald-400' : 'bg-gray-300 hover:bg-gray-400'
                          }`}
                          style={{ height: `${height}%` }}
                        />
                      );
                    })}
                  </div>
                  <div className="flex justify-between text-xs text-gray-400">
                    <span>Dec 16</span>
                    <span className="text-emerald-500">Peak: Jan 2</span>
                    <span>Jan 14</span>
                  </div>
                </div>
              )}

              {activeTab === 'holdings' && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-4">Token Holdings</h3>
                  <div className="space-y-3">
                    {holdings.map((h, i) => (
                      <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-200">
                        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-sm font-bold text-gray-600">
                          {h.token.slice(0, 2)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <span className="font-medium text-gray-900">{h.token}</span>
                            <span className="font-semibold text-gray-900">{h.value}</span>
                          </div>
                          <div className="flex items-center justify-between mt-0.5">
                            <span className="text-sm text-gray-500">{h.amount}</span>
                            <span className="text-sm text-gray-400">{h.pct}%</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'incentives' && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-4">Campaign History</h3>
                  <div className="space-y-2">
                    {[
                      { name: 'Welcome Bonus', status: 'claimed', amount: '100 TORQ', date: 'Jan 2' },
                      { name: 'LP Incentive', status: 'claimed', amount: '500 TORQ', date: 'Jan 5' },
                      { name: 'Trading Streak', status: 'claimed', amount: '250 TORQ', date: 'Jan 8' },
                      { name: 'Whale Retention', status: 'pending', amount: '1,000 TORQ', date: 'Active' },
                    ].map((campaign, i) => (
                      <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-200">
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                            campaign.status === 'claimed' ? 'bg-emerald-100' : 'bg-amber-100'
                          }`}>
                            <Gift className={`w-4 h-4 ${
                              campaign.status === 'claimed' ? 'text-emerald-600' : 'text-amber-600'
                            }`} />
                          </div>
                          <div>
                            <div className="font-medium text-gray-900">{campaign.name}</div>
                            <div className="text-xs text-gray-500">{campaign.date}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold text-gray-900">{campaign.amount}</div>
                          <div className={`text-xs font-medium ${
                            campaign.status === 'claimed' ? 'text-emerald-600' : 'text-amber-600'
                          }`}>
                            {campaign.status === 'claimed' ? 'Claimed' : 'Pending'}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Sidebar */}
            <div className="w-64 border-l border-gray-200 p-4 bg-gray-50">
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-violet-600" />
                    <span className="font-semibold text-violet-600 text-sm">Notes</span>
                  </div>
                  <button className="text-xs text-gray-500 hover:text-gray-700 flex items-center gap-1">
                    <Plus className="w-3 h-3" />
                    Add Note
                  </button>
                </div>
                <div className="bg-white rounded-lg p-3 border border-gray-200 text-sm">
                  <p className="text-gray-700">High-value power user. Consider for VIP rewards program.</p>
                  <div className="flex items-center gap-2 mt-2 pt-2 border-t border-gray-100 text-xs text-gray-500">
                    <span className="font-medium">torr...8XZz</span>
                    <span>•</span>
                    <span>Jan 4, 2026</span>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Layers className="w-4 h-4 text-violet-600" />
                  <span className="font-semibold text-violet-600 text-sm">Lists</span>
                </div>
                <div className="bg-white rounded-lg p-3 border border-gray-200 mb-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-900">Winners List</span>
                    <div className="w-8 h-5 bg-emerald-500 rounded-full relative">
                      <div className="absolute right-0.5 top-0.5 w-4 h-4 bg-white rounded-full shadow" />
                    </div>
                  </div>
                </div>
                <button className="w-full flex items-center justify-center gap-2 py-2 border border-dashed border-gray-300 rounded-lg text-sm text-gray-500 hover:border-gray-400">
                  <Plus className="w-4 h-4" />
                  Create New List
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-100 flex gap-3 bg-white">
          <button
            onClick={() => onAskAI(user)}
            className="flex-1 py-2.5 px-4 bg-violet-600 hover:bg-violet-700 text-white text-sm font-semibold rounded-xl transition-colors flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            Ask AI About This User
          </button>
          <button className="py-2.5 px-4 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 text-sm font-semibold rounded-xl transition-colors flex items-center justify-center gap-2">
            <Gift className="w-4 h-4" />
            Send Reward
          </button>
        </div>
      </div>
    </div>
  );
};

// Segment Builder Modal
const SegmentBuilderModal = ({ onClose, onSave }) => {
  const [conditions, setConditions] = useState([
    { field: 'volume_7d', operator: 'greater_than', value: '10000' }
  ]);
  const [segmentName, setSegmentName] = useState('');
  const [previewCount, setPreviewCount] = useState(234);

  const fields = [
    { value: 'volume_7d', label: '7d Volume' },
    { value: 'volume_30d', label: '30d Volume' },
    { value: 'activity_change', label: 'Activity Change %' },
    { value: 'last_active', label: 'Last Active' },
  ];

  const operators = [
    { value: 'greater_than', label: 'Greater than' },
    { value: 'less_than', label: 'Less than' },
    { value: 'equals', label: 'Equals' },
  ];

  const addCondition = () => {
    setConditions([...conditions, { field: 'volume_7d', operator: 'greater_than', value: '' }]);
  };

  const removeCondition = (index) => {
    setConditions(conditions.filter((_, i) => i !== index));
  };

  const updateCondition = (index, key, value) => {
    const updated = [...conditions];
    updated[index][key] = value;
    setConditions(updated);
    setPreviewCount(Math.floor(Math.random() * 500) + 50);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-white rounded-2xl w-full max-w-2xl mx-4 overflow-hidden shadow-2xl max-h-[90vh] flex flex-col" onClick={e => e.stopPropagation()}>
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-violet-100 flex items-center justify-center">
              <Layers className="w-5 h-5 text-violet-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Build Segment</h3>
              <p className="text-sm text-gray-500">Define conditions to create a user segment</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Segment Name</label>
            <input
              type="text"
              value={segmentName}
              onChange={(e) => setSegmentName(e.target.value)}
              placeholder="e.g., High-Value Declining Users"
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-3">Conditions</label>
            <div className="space-y-3">
              {conditions.map((condition, index) => (
                <div key={index} className="flex items-center gap-2">
                  {index > 0 && <span className="text-xs font-medium text-gray-400 w-10">AND</span>}
                  {index === 0 && <span className="w-10" />}

                  <select
                    value={condition.field}
                    onChange={(e) => updateCondition(index, 'field', e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white"
                  >
                    {fields.map(f => (
                      <option key={f.value} value={f.value}>{f.label}</option>
                    ))}
                  </select>

                  <select
                    value={condition.operator}
                    onChange={(e) => updateCondition(index, 'operator', e.target.value)}
                    className="w-36 px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white"
                  >
                    {operators.map(o => (
                      <option key={o.value} value={o.value}>{o.label}</option>
                    ))}
                  </select>

                  <input
                    type="text"
                    value={condition.value}
                    onChange={(e) => updateCondition(index, 'value', e.target.value)}
                    placeholder="Value"
                    className="w-32 px-3 py-2 border border-gray-200 rounded-lg text-sm"
                  />

                  {conditions.length > 1 && (
                    <button onClick={() => removeCondition(index)} className="p-2 hover:bg-gray-100 rounded-lg text-gray-400">
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>

            <button onClick={addCondition} className="mt-3 flex items-center gap-2 text-sm font-medium text-violet-600 hover:text-violet-700">
              <Plus className="w-4 h-4" />
              Add Condition
            </button>
          </div>

          <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4 text-gray-400" />
                <span className="text-sm font-medium text-gray-700">Preview</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-violet-600">{previewCount}</span>
                <span className="text-sm text-gray-500">users match</span>
              </div>
            </div>
          </div>
        </div>

        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex gap-3">
          <button
            onClick={() => onSave(segmentName, conditions, previewCount)}
            disabled={!segmentName.trim()}
            className="flex-1 py-2.5 px-4 bg-violet-600 hover:bg-violet-700 disabled:bg-gray-300 text-white text-sm font-semibold rounded-xl transition-colors flex items-center justify-center gap-2"
          >
            <Layers className="w-4 h-4" />
            Save Segment
          </button>
          <button onClick={onClose} className="py-2.5 px-4 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 text-sm font-semibold rounded-xl transition-colors">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

// ============================================
// ALL CONVERSATIONS PANEL
// ============================================

const AllConversationsPanel = ({ conversations, searchQuery, onSearchChange, onClose, onSelectConversation }) => {
  const filteredConversations = conversations.filter(c =>
    c.query.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.result.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/20 z-40"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="fixed inset-y-0 right-0 w-96 bg-white shadow-xl border-l border-gray-200 z-50 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <History className="w-5 h-5 text-violet-600" />
            <h2 className="text-lg font-semibold text-gray-900">All Conversations</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Search */}
        <div className="px-6 py-4 border-b border-gray-100">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search conversations..."
              className="w-full pl-9 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Conversations List */}
        <div className="flex-1 overflow-y-auto px-4 py-3">
          {filteredConversations.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <MessageSquare className="w-10 h-10 mx-auto mb-3 text-gray-300" />
              <p className="text-sm">No conversations found</p>
            </div>
          ) : (
            <div className="space-y-2">
              {filteredConversations.map((c, i) => (
                <div
                  key={i}
                  onClick={() => {
                    onSelectConversation(c);
                    onClose();
                  }}
                  className="px-4 py-3 rounded-xl cursor-pointer hover:bg-gray-50 border border-transparent hover:border-gray-200 transition-all"
                >
                  <p className="text-sm font-medium text-gray-800 line-clamp-2">{c.query}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs text-violet-600 font-medium">→ {c.result}</span>
                    <span className="text-xs text-gray-400">{c.time}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-100 bg-gray-50">
          <p className="text-xs text-gray-500 text-center">
            {filteredConversations.length} conversation{filteredConversations.length !== 1 ? 's' : ''}
          </p>
        </div>
      </div>
    </>
  );
};

// ============================================
// MAIN APP
// ============================================

export default function TorqueApp() {
  // Navigation state
  const [currentView, setCurrentView] = useState('home');

  // Home view state
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [timePeriod, setTimePeriod] = useState('7d');
  const [selectedMetric, setSelectedMetric] = useState(null);
  const [showSegmentModal, setShowSegmentModal] = useState(false);
  const [showCampaignModal, setShowCampaignModal] = useState(false);
  const [segmentName, setSegmentName] = useState('');

  // New modal states
  const [showAllUsersModal, setShowAllUsersModal] = useState(false);
  const [showCampaignApproval, setShowCampaignApproval] = useState(false);
  const [showIncentiveModal, setShowIncentiveModal] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showInvestigateModal, setShowInvestigateModal] = useState(false);
  const [selectedOpportunity, setSelectedOpportunity] = useState(null);
  const [selectedSegmentDetail, setSelectedSegmentDetail] = useState(null);
  const [showAllConversations, setShowAllConversations] = useState(false);
  const [conversationSearchQuery, setConversationSearchQuery] = useState('');

  // CRM view state
  const [selectedUsers, setSelectedUsers] = useState(new Set());
  const [selectedUserProfile, setSelectedUserProfile] = useState(null);
  const [showSegmentBuilder, setShowSegmentBuilder] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [healthFilter, setHealthFilter] = useState('');
  const [volumeFilter, setVolumeFilter] = useState('');
  const [activityFilter, setActivityFilter] = useState('');
  const [segmentFilter, setSegmentFilter] = useState('');

  // Reset home state
  const resetHome = () => {
    setMessages([]);
    setInputValue('');
    setSelectedMetric(null);
    setShowSegmentModal(false);
    setShowCampaignModal(false);
    setSegmentName('');
    setShowAllUsersModal(false);
    setShowCampaignApproval(false);
    setShowExportModal(false);
    setShowShareModal(false);
    setShowInvestigateModal(false);
    setShowIncentiveModal(false);
    setSelectedOpportunity(null);
  };

  // Sparkline data
  const sparklineDataSets = {
    '7d': {
      users: [45800, 46100, 46400, 46900, 47200, 47800, 48200],
      volume: [14200000, 13800000, 13500000, 13100000, 12900000, 12600000, 12800000],
      fees: [42000, 41200, 40100, 39500, 38800, 37900, 38400],
      active: [4019, 4050, 4080, 4120, 4090, 4150, 4175]
    },
    '30d': {
      users: [42000, 43500, 44200, 45100, 46000, 47200, 48200],
      volume: [11000000, 12500000, 14000000, 13200000, 12800000, 13100000, 12800000],
      fees: [35000, 38000, 42000, 40000, 39000, 38500, 38400],
      active: [3800, 3950, 4100, 4050, 4120, 4100, 4175]
    },
    '90d': {
      users: [35000, 38000, 41000, 44000, 46000, 47500, 48200],
      volume: [8000000, 10000000, 12000000, 14500000, 13000000, 12500000, 12800000],
      fees: [28000, 32000, 38000, 44000, 41000, 39000, 38400],
      active: [3200, 3500, 3800, 4000, 4100, 4150, 4175]
    }
  };

  const metrics = [
    { icon: Users, label: 'Users', value: '4,175', subtitle: 'of 48.2K activated', change: '+3.8%', changeLabel: 'vs last week', sparklineData: sparklineDataSets[timePeriod].active, trend: 'up' },
    { icon: Activity, label: 'Usage', value: '20.6K', subtitle: '12.4K buys • 8.2K sells', change: '+5.2%', changeLabel: 'trades vs last week', sparklineData: sparklineDataSets[timePeriod].volume, trend: 'up' },
    { icon: Wallet, label: 'Value', value: '$12.8M', subtitle: '$38.4K in fees', change: '-8.2%', changeLabel: 'volume vs last week', sparklineData: sparklineDataSets[timePeriod].fees, trend: 'down' }
  ];

  const conversations = [
    { query: "Show me whale activity this week", result: "Created report", time: "2h ago" },
    { query: "Who stopped trading after fee change?", result: "Found 234 users", time: "Yesterday" },
    { query: "Create retention campaign", result: "Launched", time: "Monday" }
  ];

  const segments = [
    { name: "At-Risk Whales", count: 12, trend: "+3", isUp: true },
    { name: "Rising Stars", count: 456, trend: "+89", isUp: true },
    { name: "Token Holders", count: "2.3K" },
    { name: "New Users (7d)", count: 892 }
  ];

  const campaigns = [
    { name: "Whale Retention", status: "running" },
    { name: "New User Bonus", status: "running" },
    { name: "Streak Challenge", status: "paused" }
  ];

  const opportunities = [
    {
      id: 'whale-reactivation',
      title: 'Whale Reactivation',
      subtitle: 'Targeting 526 inactive wallets',
      value: '+$64M',
      valueLabel: 'projected volume',
      color: 'red',
      healthDistribution: [
        { label: 'Active', value: 588, percent: 53, color: 'emerald' },
        { label: 'Inactive', value: 526, percent: 47, color: 'amber' },
        { label: 'At Risk', value: 0, percent: 0, color: 'red' }
      ],
      insight: "47% of your top-tier wallets have gone dormant. These users historically respond to status-based competition.",
      proof: "Leaderboards have driven a 1.8x volume lift in similar cohorts ($229k avg vs $122k baseline).",
      cta: 'Deploy Leaderboard',
      ctaColor: 'violet',
      query: 'Create a leaderboard campaign for inactive whales'
    },
    {
      id: 'rising-stars',
      title: 'Rising Star Nurture',
      subtitle: 'Targeting 456 high-growth traders',
      value: '+$40M',
      valueLabel: 'potential volume',
      color: 'emerald',
      healthDistribution: [
        { label: 'Engaged', value: 312, percent: 68, color: 'emerald' },
        { label: 'Moderate', value: 98, percent: 22, color: 'amber' },
        { label: 'At Risk', value: 46, percent: 10, color: 'red' }
      ],
      insight: "These mid-tier traders are growing 127% MoM. Early engagement dramatically increases lifetime value.",
      proof: "Tiered rewards programs increase retention by 45% and volume by 2.1x for this cohort.",
      cta: 'Launch Rewards Program',
      ctaColor: 'emerald',
      query: 'Create a rewards program for rising traders'
    },
    {
      id: 'reactivation',
      title: 'Win-Back Campaign',
      subtitle: 'Targeting 234 recently inactive',
      value: '+$1.2M',
      valueLabel: 'recoverable volume',
      color: 'amber',
      healthDistribution: [
        { label: 'Winnable', value: 156, percent: 67, color: 'emerald' },
        { label: 'Unlikely', value: 52, percent: 22, color: 'amber' },
        { label: 'Churned', value: 26, percent: 11, color: 'red' }
      ],
      insight: "These users traded last week but went silent. The window for re-engagement is narrowing.",
      proof: "Fee rebates within 7 days of inactivity recover 34% of users vs 8% after 14 days.",
      cta: 'Activate Rebates',
      ctaColor: 'amber',
      query: 'Create a rebate campaign for inactive users'
    }
  ];

  const quickPrompts = [
    "Who are my most valuable users at risk?",
    "Show me users who traded last week but not this week",
    "Create a segment of rising mid-tier traders",
    "Why is retention dropping this week?"
  ];

  // CRM users data
  const users = [
    { id: 1, wallet: '0x7f3a...8c2d', volume: '$42,180', trend: -77, rank: 2, activityData: [9, 8, 7, 5, 3, 2, 1], segments: [{ name: 'Whale', icon: 'whale' }], health: 'at-risk', lastActive: '2h ago' },
    { id: 2, wallet: '0xa2c9...1b4e', volume: '$31,420', trend: 45, rank: 8, activityData: [2, 3, 4, 5, 7, 8, 9], segments: [{ name: 'Rising', icon: 'rising' }], health: 'rising', lastActive: '30m ago' },
    { id: 3, wallet: '0x3b7f...9d1a', volume: '$18,900', trend: -65, rank: 15, activityData: [8, 7, 6, 4, 3, 2, 1], segments: [{ name: 'Whale', icon: 'whale' }, { name: 'LP', icon: 'lp' }], health: 'at-risk', lastActive: '1d ago' },
    { id: 4, wallet: '0x2f8c...5d4e', volume: '$28,100', trend: 133, rank: 5, activityData: [1, 2, 3, 5, 6, 8, 9], segments: [{ name: 'Rising', icon: 'rising' }], health: 'rising', lastActive: '1h ago' },
    { id: 5, wallet: '0x9a1b...3c7f', volume: '$12,450', trend: 0, rank: 42, activityData: [5, 5, 5, 5, 5, 5, 5], segments: [{ name: 'Loyal', icon: 'loyal' }], health: 'healthy', lastActive: '4h ago' },
    { id: 6, wallet: '0x4e6d...8a2c', volume: '$8,230', trend: 28, rank: 156, activityData: [3, 3, 4, 5, 5, 6, 6], segments: [{ name: 'New', icon: 'new' }], health: 'new', lastActive: '15m ago' },
    { id: 7, wallet: '0xb8c2...4f1e', volume: '$0', trend: -100, rank: null, activityData: [6, 5, 4, 2, 1, 0, 0], segments: [], health: 'churned', lastActive: '14d ago' },
    { id: 8, wallet: '0x6d9e...2a7c', volume: '$52,800', trend: -42, rank: 3, activityData: [9, 9, 8, 7, 6, 5, 4], segments: [{ name: 'Whale', icon: 'whale' }], health: 'at-risk', lastActive: '6h ago' },
  ];

  const filteredUsers = users.filter(user => {
    if (healthFilter && user.health !== healthFilter) return false;
    if (searchQuery && !user.wallet.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  // Handlers
  const handleSend = (text) => {
    const message = text || inputValue;
    if (!message.trim()) return;

    setMessages(prev => [...prev, { role: 'user', content: message }]);
    setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      const lowerMessage = message.toLowerCase();

      // Check for campaign queries first (more specific)
      if (lowerMessage.includes('campaign') && (lowerMessage.includes('whale') || lowerMessage.includes('retention'))) {
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: "Here's the Whale Retention campaign performance. The rebate is driving significant volume lift among recipients compared to non-recipients.",
          data: {
            type: 'campaign_performance',
            title: "Whale Retention Campaign",
            status: "Active",
            headerStats: [
              { value: "2,847", label: "TORQ Distributed", icon: "gift" },
              { value: "$801K", label: "Volume Driven", icon: "trending-up" },
              { value: "+185%", label: "Recipient Lift", icon: "zap" }
            ],
            comparison: {
              recipients: {
                count: 7,
                avgVolumeBefore: "$38K",
                avgVolumeNow: "$114K",
                lift: "+200%",
                totalVolume: "$801K"
              },
              nonRecipients: {
                count: 5,
                avgVolumeBefore: "$41K",
                avgVolumeNow: "$47K",
                lift: "+15%",
                totalVolume: "$235K"
              }
            },
            dailyData: [
              { date: "Jan 8", recipients: 3, amount: "847 TORQ", volume: "$142K" },
              { date: "Jan 9", recipients: 2, amount: "512 TORQ", volume: "$98K" },
              { date: "Jan 10", recipients: 4, amount: "923 TORQ", volume: "$187K" },
              { date: "Jan 11", recipients: 2, amount: "341 TORQ", volume: "$89K" },
              { date: "Jan 12", recipients: 1, amount: "224 TORQ", volume: "$67K" }
            ],
            topRecipients: [
              { wallet: "0x7f3a...8c2d", rewards: "423 TORQ", volumeBefore: "$42K", volumeNow: "$156K", lift: "+271%" },
              { wallet: "0xa2c9...1b4e", rewards: "387 TORQ", volumeBefore: "$38K", volumeNow: "$124K", lift: "+226%" },
              { wallet: "0x3b7f...9d1a", rewards: "298 TORQ", volumeBefore: "$35K", volumeNow: "$98K", lift: "+180%" }
            ],
            chartData: {
              recipients: [42, 68, 89, 102, 114],
              nonRecipients: [41, 43, 44, 46, 47]
            }
          }
        }]);
      } else if (lowerMessage.includes('opportunity') && (lowerMessage.includes('at-risk') || lowerMessage.includes('whale'))) {
        // At-risk whales opportunity
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: "",
          data: {
            type: 'opportunity',
            color: 'red',
            icon: 'alert-triangle',
            title: "At-Risk Whales Opportunity",
            subtitle: "12 high-value users showing churn signals",
            stats: [
              { value: "$890K", label: "Weekly Volume at Risk" },
              { value: "-62%", label: "Avg Activity Decline" },
              { value: "12", label: "Users Affected" }
            ],
            explanation: [
              "These 12 wallets represent your top 5% by volume but have shown 30%+ activity decline this week. Based on historical patterns, wallets with this behavior have a 73% chance of churning within 14 days.",
              "**Recommended Action:** Deploy a fee rebate campaign targeting these specific wallets. Our analysis suggests a 50% fee rebate on trades over $10K would be most effective.",
              "**Expected Impact:** Based on similar campaigns, you could recover 60-70% of at-risk volume, representing approximately $530K-$620K in weekly trading activity."
            ],
            benchmark: "Protocols using targeted retention campaigns see 2.1x better retention rates than those using broad incentives.",
            users: [
              { wallet: "0x7f3a...8c2d", current: "$42K", was: "$180K", change: "-77%" },
              { wallet: "0xa2c9...1b4e", current: "$31K", was: "$95K", change: "-67%" },
              { wallet: "0x3b7f...9d1a", current: "$18K", was: "$72K", change: "-75%" }
            ],
            cta: "Deploy Retention Campaign",
            ctaColor: "red"
          }
        }]);
      } else if (lowerMessage.includes('opportunity') && lowerMessage.includes('rising')) {
        // Rising stars opportunity
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: "",
          data: {
            type: 'opportunity',
            color: 'emerald',
            icon: 'trending-up',
            title: "Rising Stars Opportunity",
            subtitle: "456 traders with exceptional growth",
            stats: [
              { value: "456", label: "Rising Traders" },
              { value: "+127%", label: "Avg Volume Growth" },
              { value: "$2.1M", label: "Combined Volume" }
            ],
            explanation: [
              "These 456 mid-tier traders have increased their activity by 50%+ this month. They're showing strong engagement signals and represent your highest-potential segment for tier advancement.",
              "**Recommended Action:** Deploy a tiered rewards campaign that incentivizes reaching the next volume tier. Offer bonus TORQ rewards for hitting $50K monthly volume.",
              "**Expected Impact:** Based on cohort analysis, 23% of rising stars typically advance to whale tier within 60 days. With targeted incentives, this could increase to 35%, adding approximately $4.2M in monthly volume."
            ],
            benchmark: "Top DeFi protocols see 40% of their whale growth come from nurturing mid-tier 'rising star' segments.",
            users: [
              { wallet: "0xa2c9...1b4e", current: "$31K", was: "$12K", change: "+158%" },
              { wallet: "0x2f8c...5d4e", current: "$28K", was: "$12K", change: "+133%" },
              { wallet: "0x6d9e...2a7c", current: "$19K", was: "$9K", change: "+111%" }
            ],
            cta: "Launch Growth Campaign",
            ctaColor: "emerald"
          }
        }]);
      } else if (lowerMessage.includes('opportunity') && lowerMessage.includes('inactive')) {
        // Inactive users opportunity
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: "",
          data: {
            type: 'opportunity',
            color: 'amber',
            icon: 'user-x',
            title: "Inactive Users Opportunity",
            subtitle: "234 users went silent this week",
            stats: [
              { value: "234", label: "Inactive Users" },
              { value: "$1.2M", label: "Last Week Volume" },
              { value: "5.2d", label: "Avg Days Silent" }
            ],
            explanation: [
              "These 234 users were active last week but haven't traded this week. Early intervention is key - users who go inactive for more than 10 days have only a 12% natural return rate.",
              "**Recommended Action:** Deploy a re-engagement campaign with a time-limited bonus. A 'Welcome Back' offer with 100 TORQ bonus on first trade within 48 hours has shown strong results.",
              "**Expected Impact:** Reactivation campaigns targeting users within the first week of inactivity typically see 35-45% return rates, potentially recovering $420K-$540K in weekly volume."
            ],
            benchmark: "The optimal reactivation window is 3-7 days. After 14 days, return rates drop below 8%.",
            users: [
              { wallet: "0x8d4e...2f1a", current: "$0", was: "$28K", change: "-100%" },
              { wallet: "0x1c9b...7e3d", current: "$0", was: "$15K", change: "-100%" },
              { wallet: "0x5a2f...9c8b", current: "$0", was: "$12K", change: "-100%" }
            ],
            cta: "Launch Reactivation Campaign",
            ctaColor: "amber"
          }
        }]);
      } else if (lowerMessage.includes('segment') && (lowerMessage.includes('at-risk') || lowerMessage.includes('whale'))) {
        // At-Risk Whales segment
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: "",
          data: {
            type: 'segment',
            id: 'at-risk-whales',
            name: "At-Risk Whales",
            description: "Top 25% traders with 30%+ volume decline WoW",
            color: 'red',
            stats: [
              { value: "1,099", label: "At-Risk Traders", sublabel: "of 2500 top 25%" },
              { value: "$5.56B", label: "Volume At Risk", sublabel: "33.9% of 30d volume" },
              { value: "85.3%", label: "Avg Decline Rate", sublabel: "Week-over-week" }
            ],
            breakdown: [
              { label: "Critical", value: 754, sublabel: ">75% decline", color: "red" },
              { label: "Warning", value: 345, sublabel: "50-75% decline", color: "amber" }
            ],
            insight: "Your top 25% of traders typically generate 60-80% of total volume. These 1,099 traders at risk represent $5.56B in 30-day volume. Preventing high-volume churn has 3-5x the ROI of general retention efforts.",
            users: [
              { rank: 1, wallet: "0x7f3a...8c2d", volume30d: "$49.97M", currentWeek: "$0.00", priorWeek: "$1.03M", decline: "-100%", risk: "critical", daysSincePeak: 7 },
              { rank: 2, wallet: "0xa2c9...1b4e", volume30d: "$16.87M", currentWeek: "$0.00", priorWeek: "$376.42K", decline: "-100%", risk: "critical", daysSincePeak: 7 },
              { rank: 3, wallet: "0x3b7f...9d1a", volume30d: "$15.67M", currentWeek: "$0.00", priorWeek: "$7.30M", decline: "-100%", risk: "critical", daysSincePeak: 7 }
            ],
            chartData: {
              distribution: [
                { range: "50-60%", count: 120 },
                { range: "60-70%", count: 145 },
                { range: "70-80%", count: 180 },
                { range: "80-90%", count: 100 },
                { range: "90-100%", count: 554 }
              ],
              trend: [
                { date: "Jan 1", value: 1.8 },
                { date: "Jan 3", value: 1.6 },
                { date: "Jan 5", value: 1.4 },
                { date: "Jan 7", value: 0.9 },
                { date: "Jan 9", value: 0.7 },
                { date: "Jan 11", value: 0.5 },
                { date: "Jan 13", value: 0.4 }
              ]
            }
          }
        }]);
      } else if (lowerMessage.includes('segment') && lowerMessage.includes('rising')) {
        // Rising Stars segment
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: "",
          data: {
            type: 'segment',
            id: 'rising-stars',
            name: "Rising Stars",
            description: "Mid-tier traders with 50%+ volume growth this month",
            color: 'emerald',
            stats: [
              { value: "456", label: "Rising Traders", sublabel: "of 3,200 mid-tier" },
              { value: "$2.1M", label: "Combined Volume", sublabel: "+127% avg growth" },
              { value: "23%", label: "Whale Potential", sublabel: "likely to advance tier" }
            ],
            breakdown: [
              { label: "High Growth", value: 189, sublabel: ">100% growth", color: "emerald" },
              { label: "Steady Growth", value: 267, sublabel: "50-100% growth", color: "green" }
            ],
            insight: "Rising stars are your pipeline to whale status. 23% of this segment typically advances to whale tier within 60 days. Targeted incentives can increase this to 35%.",
            users: [
              { rank: 1, wallet: "0xa2c9...1b4e", volume30d: "$31K", currentWeek: "$12K", priorWeek: "$4.8K", growth: "+158%", potential: "high", streakDays: 14 },
              { rank: 2, wallet: "0x2f8c...5d4e", volume30d: "$28K", currentWeek: "$11K", priorWeek: "$4.7K", growth: "+133%", potential: "high", streakDays: 12 },
              { rank: 3, wallet: "0x6d9e...2a7c", volume30d: "$19K", currentWeek: "$8K", priorWeek: "$3.8K", growth: "+111%", potential: "medium", streakDays: 9 }
            ]
          }
        }]);
      } else if (lowerMessage.includes('segment') && (lowerMessage.includes('token') || lowerMessage.includes('holder'))) {
        // Token Holders segment
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: "",
          data: {
            type: 'segment',
            id: 'token-holders',
            name: "Token Holders",
            description: "Wallets holding TORQ tokens",
            color: 'violet',
            stats: [
              { value: "2,347", label: "Token Holders", sublabel: "unique wallets" },
              { value: "$4.2M", label: "Total Staked", sublabel: "avg 1,789 TORQ" },
              { value: "68%", label: "Active Traders", sublabel: "traded in 30d" }
            ],
            breakdown: [
              { label: "Large Holders", value: 234, sublabel: ">10K TORQ", color: "violet" },
              { label: "Medium Holders", value: 892, sublabel: "1K-10K TORQ", color: "purple" },
              { label: "Small Holders", value: 1221, sublabel: "<1K TORQ", color: "gray" }
            ],
            insight: "Token holders show 2.3x higher retention than non-holders. Consider incentivizing token acquisition for at-risk users.",
            users: [
              { rank: 1, wallet: "0x8d4e...2f1a", balance: "45.2K TORQ", volume30d: "$892K", tier: "whale", holdingDays: 180 },
              { rank: 2, wallet: "0x1c9b...7e3d", balance: "32.1K TORQ", volume30d: "$654K", tier: "whale", holdingDays: 145 },
              { rank: 3, wallet: "0x5a2f...9c8b", balance: "28.9K TORQ", volume30d: "$521K", tier: "whale", holdingDays: 120 }
            ]
          }
        }]);
      } else if (lowerMessage.includes('segment') && (lowerMessage.includes('new') || lowerMessage.includes('7d'))) {
        // New Users segment
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: "",
          data: {
            type: 'segment',
            id: 'new-users',
            name: "New Users (7d)",
            description: "Wallets with first transaction in the last 7 days",
            color: 'blue',
            stats: [
              { value: "892", label: "New Users", sublabel: "last 7 days" },
              { value: "$1.8M", label: "First Week Volume", sublabel: "avg $2,018/user" },
              { value: "34%", label: "Conversion Rate", sublabel: "made 2+ trades" }
            ],
            breakdown: [
              { label: "High Intent", value: 156, sublabel: ">$5K volume", color: "blue" },
              { label: "Medium Intent", value: 412, sublabel: "$500-$5K", color: "sky" },
              { label: "Low Intent", value: 324, sublabel: "<$500", color: "gray" }
            ],
            insight: "First-week behavior strongly predicts long-term retention. Users who make 3+ trades in week 1 have 4.2x higher 90-day retention.",
            users: [
              { rank: 1, wallet: "0x9f2a...3c1d", firstTrade: "Jan 12", volume7d: "$28.4K", trades: 12, tier: "high-intent" },
              { rank: 2, wallet: "0x4e8b...7f2a", firstTrade: "Jan 11", volume7d: "$15.2K", trades: 8, tier: "high-intent" },
              { rank: 3, wallet: "0x2d5c...9e4b", firstTrade: "Jan 10", volume7d: "$12.8K", trades: 6, tier: "high-intent" }
            ]
          }
        }]);
      } else if (lowerMessage.includes('risk') || lowerMessage.includes('churn') || lowerMessage.includes('whale') || lowerMessage.includes('valuable')) {
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: "I found 12 high-value users showing churn signals. These are users in the top 5% by volume with 30%+ activity decline this week.",
          data: {
            title: "At-Risk Whales",
            urgency: "Action needed",
            stats: [
              { value: "$890K", label: "Value at Risk / week", color: "text-red-600" },
              { value: "-62%", label: "Avg Decline", color: "text-red-600" },
              { value: "12", label: "Users Affected" }
            ],
            users: [
              { wallet: "0x7f3a...8c2d", current: "$42K", was: "$180K", change: "-77%" },
              { wallet: "0xa2c9...1b4e", current: "$31K", was: "$95K", change: "-67%" },
              { wallet: "0x3b7f...9d1a", current: "$18K", was: "$72K", change: "-75%" }
            ]
          },
          actions: true
        }]);
      } else if (lowerMessage.includes('last week') || lowerMessage.includes('traded') || lowerMessage.includes('inactive') || lowerMessage.includes('stopped')) {
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: "I found 234 users who were active last week but haven't traded this week. Here's a breakdown of their activity patterns.",
          data: {
            title: "Inactive This Week",
            urgency: "234 users",
            stats: [
              { value: "234", label: "Users Found", color: "text-amber-600" },
              { value: "$1.2M", label: "Last Week Volume" },
              { value: "5.2d", label: "Avg Days Silent" }
            ],
            users: [
              { wallet: "0x8d4e...2f1a", current: "$0", was: "$28K", change: "-100%" },
              { wallet: "0x1c9b...7e3d", current: "$0", was: "$15K", change: "-100%" },
              { wallet: "0x5a2f...9c8b", current: "$0", was: "$12K", change: "-100%" }
            ]
          },
          actions: true
        }]);
      } else if (lowerMessage.includes('retention') || lowerMessage.includes('dropping') || lowerMessage.includes('why')) {
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: "Retention dropped 12% this week, primarily driven by fee sensitivity among mid-tier users. Here's the analysis:",
          data: {
            type: 'analysis',
            title: "Retention Analysis",
            urgency: "Insight",
            stats: [
              { value: "-12%", label: "Week over Week", color: "text-red-600" },
              { value: "68%", label: "Current Retention" },
              { value: "Mid-tier", label: "Most Affected" }
            ],
            users: [
              { wallet: "Fee increase", current: "42%", was: "of churned", change: "users" },
              { wallet: "Competitor", current: "31%", was: "switched to", change: "other DEX" },
              { wallet: "Natural churn", current: "27%", was: "seasonal", change: "pattern" }
            ]
          },
          actions: true
        }]);
      } else if (lowerMessage.includes('rising') || lowerMessage.includes('growing') || lowerMessage.includes('mid-tier')) {
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: "I found 456 rising mid-tier traders who've increased activity 50%+ this month. These users show strong engagement signals.",
          data: {
            title: "Rising Stars",
            urgency: "High potential",
            stats: [
              { value: "456", label: "Users Found", color: "text-emerald-600" },
              { value: "+127%", label: "Avg Growth", color: "text-emerald-600" },
              { value: "$2.1M", label: "Combined Volume" }
            ],
            users: [
              { wallet: "0xa2c9...1b4e", current: "$31K", was: "$12K", change: "+158%" },
              { wallet: "0x2f8c...5d4e", current: "$28K", was: "$12K", change: "+133%" },
              { wallet: "0x6d9e...2a7c", current: "$19K", was: "$9K", change: "+111%" }
            ]
          },
          actions: true
        }]);
      } else if (lowerMessage.includes('campaign') && (lowerMessage.includes('new user') || lowerMessage.includes('bonus'))) {
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: "Here's the New User Bonus campaign performance. Strong acquisition numbers with healthy conversion.",
          data: {
            type: 'campaign_performance',
            title: "New User Bonus Campaign",
            urgency: "Running",
            stats: [
              { value: "892", label: "New Users", color: "text-violet-600" },
              { value: "234", label: "Converted", color: "text-emerald-600" },
              { value: "26%", label: "Conversion Rate", color: "text-emerald-600" }
            ]
          }
        }]);
      } else if (lowerMessage.includes('campaign') && lowerMessage.includes('streak')) {
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: "The Streak Challenge campaign is currently paused. Here's the performance so far.",
          data: {
            type: 'campaign_performance',
            title: "Streak Challenge Campaign",
            urgency: "Paused",
            stats: [
              { value: "1.2K", label: "Participants", color: "text-violet-600" },
              { value: "456", label: "Active Streaks", color: "text-amber-600" },
              { value: "38%", label: "Completion Rate", color: "text-amber-600" }
            ]
          }
        }]);
      } else {
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: "I can help you analyze your users and create targeted campaigns. Try asking me things like:\n\n• \"Who are my most valuable users at risk?\"\n• \"Show me users who traded last week but not this week\"\n• \"Why is retention dropping?\""
        }]);
      }
    }, 1500);
  };

  const handleSaveSegment = (name) => {
    setShowSegmentModal(false);
    setSegmentName('');
    setMessages(prev => [...prev, {
      role: 'assistant',
      content: `I've saved the segment "${name}" with 12 users. It will auto-refresh daily.`,
      data: { type: 'segment_saved', title: name, urgency: "Saved", stats: [{ value: "12", label: "Users", color: "text-violet-600" }, { value: "$890K", label: "Total Volume" }, { value: "Daily", label: "Refresh" }] }
    }]);
  };

  const handleCreateCampaign = (campaign) => {
    setShowCampaignModal(false);
    setMessages(prev => [...prev, {
      role: 'assistant',
      content: `Campaign "${campaign.name}" is now live!`,
      data: { type: 'campaign_launched', title: campaign.name, urgency: "Live", stats: [{ value: "12", label: "Target Users", color: "text-violet-600" }, { value: campaign.duration + "d", label: "Duration" }, { value: "2.4x", label: "Est. ROI", color: "text-emerald-600" }] }
    }]);
  };

  const handleShowAllUsers = () => {
    setShowAllUsersModal(true);
  };

  const handleCampaignApproval = () => {
    setShowCampaignApproval(true);
  };

  const handleCampaignApprovalAction = (action, editedDetails) => {
    setShowCampaignApproval(false);
    if (action === 'approve') {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: `Campaign "Win-Back At-Risk Whales" is now live! I'll monitor performance and alert you to significant changes.`,
        data: { type: 'campaign_launched', title: "Win-Back At-Risk Whales", urgency: "Live", stats: [{ value: "12", label: "Target Users", color: "text-violet-600" }, { value: "7d", label: "Duration" }, { value: "2.4x", label: "Est. ROI", color: "text-emerald-600" }] }
      }]);
    } else if (action === 'cancel') {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: "Campaign cancelled. Let me know if you'd like to try a different approach for re-engaging these users."
      }]);
    }
  };

  const handleExport = () => {
    setShowExportModal(true);
  };

  const handleExportAction = (options) => {
    setShowExportModal(false);
    setMessages(prev => [...prev, {
      role: 'assistant',
      content: `Report exported as ${options.format.toUpperCase()}${options.email ? ` and sent to ${options.email}` : ''}. The file includes your analysis data${options.includeCharts ? ' with charts' : ''}${options.includeRawData ? ' and raw data' : ''}.`
    }]);
  };

  const handleShare = () => {
    setShowShareModal(true);
  };

  const handleShareAction = (method, details) => {
    setShowShareModal(false);
    const methodLabels = { link: 'Link copied', email: 'Email sent', slack: 'Shared to Slack' };
    setMessages(prev => [...prev, {
      role: 'assistant',
      content: `${methodLabels[method]}! ${method === 'link' ? 'Anyone with the link can view this analysis.' : 'Recipients will receive the analysis shortly.'}`
    }]);
  };

  const handleInvestigate = () => {
    setShowInvestigateModal(true);
  };

  const handleInvestigateAction = (question) => {
    setShowInvestigateModal(false);
    handleSend(question);
  };

  const handleSaveSegmentWithAlert = (options) => {
    setShowSegmentModal(false);
    setSegmentName('');
    let content = `I've saved the segment "${options.name}" with 12 users. It will auto-refresh daily.`;
    if (options.alertEnabled) {
      content += ` I'll notify you via ${options.notificationMethod} when the segment changes by more than ${options.threshold}%.`;
    }
    setMessages(prev => [...prev, {
      role: 'assistant',
      content,
      data: { type: 'segment_saved', title: options.name, urgency: "Saved", stats: [{ value: "12", label: "Users", color: "text-violet-600" }, { value: "$890K", label: "Total Volume" }, { value: options.alertEnabled ? "Alert On" : "Daily", label: "Refresh" }] }
    }]);
  };

  const toggleSelectAll = () => {
    if (selectedUsers.size === filteredUsers.length) {
      setSelectedUsers(new Set());
    } else {
      setSelectedUsers(new Set(filteredUsers.map(u => u.id)));
    }
  };

  const toggleSelectUser = (id) => {
    const newSelected = new Set(selectedUsers);
    if (newSelected.has(id)) newSelected.delete(id);
    else newSelected.add(id);
    setSelectedUsers(newSelected);
  };

  // ============================================
  // RENDER
  // ============================================

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className="w-72 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-5 border-b border-gray-100">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
              <TorqueLogo className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-bold text-gray-900">TORQUE</span>
          </div>
        </div>

        <div className="px-4 py-3 border-b border-gray-100">
          <button className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl bg-gray-50 border border-gray-200 hover:bg-gray-100 transition-colors">
            <div className="w-7 h-7 rounded-lg bg-violet-100 flex items-center justify-center text-xs font-semibold text-violet-600">DP</div>
            <span className="flex-1 text-left text-sm font-medium text-gray-700">Demo Project</span>
            <ChevronDown className="w-4 h-4 text-gray-400" />
          </button>
        </div>

        <div className="px-4 py-3 border-b border-gray-100">
          <button
            onClick={() => setShowIncentiveModal(true)}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-700 text-sm font-semibold text-white transition-colors"
          >
            <Gift className="w-4 h-4" />
            New Incentive
          </button>
        </div>

        <nav className="px-4 py-3 border-b border-gray-100 space-y-1">
          <button
            onClick={() => setCurrentView('home')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
              currentView === 'home'
                ? 'bg-violet-50 text-violet-700 border border-violet-200'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <LayoutDashboard className="w-5 h-5" />
            Home
          </button>
          <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors">
            <Gift className="w-5 h-5" />
            Incentives
            <ChevronRight className="w-4 h-4 ml-auto text-gray-400" />
          </button>
          <button
            onClick={() => setCurrentView('crm')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
              currentView === 'crm'
                ? 'bg-violet-50 text-violet-700 border border-violet-200'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Users className="w-5 h-5" />
            CRM
          </button>
        </nav>

        {/* Context panels for current view */}
        <div className="flex-1 overflow-y-auto px-4 py-3 space-y-4">
          {currentView === 'home' ? (
            <>
              <div>
                <div className="flex items-center justify-between py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center gap-2"><History className="w-3.5 h-3.5" /><span>Recent</span></div>
                  <button
                    onClick={() => setShowAllConversations(true)}
                    className="text-xs font-medium text-violet-600 hover:text-violet-700 cursor-pointer normal-case"
                  >
                    View All
                  </button>
                </div>
                <div className="mt-2 space-y-1">
                  {conversations.map((c, i) => (
                    <div key={i} className="px-3 py-2.5 rounded-lg cursor-pointer hover:bg-gray-50">
                      <p className="text-sm text-gray-700 truncate">{c.query}</p>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-xs text-gray-400">→ {c.result}</span>
                        <span className="text-xs text-gray-400">{c.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  <Layers className="w-3.5 h-3.5" /><span>Segments</span>
                </div>
                <div className="mt-2 space-y-0.5">
                  {segments.map((s, i) => (
                    <div
                      key={i}
                      onClick={() => handleSend(`Show me the ${s.name} segment`)}
                      className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-gray-50 cursor-pointer"
                    >
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-violet-500" />
                        <span className="text-sm text-gray-700">{s.name}</span>
                        <span className="text-xs text-gray-400">({s.count})</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  <Target className="w-3.5 h-3.5" /><span>Campaigns</span>
                </div>
                <div className="mt-2 space-y-0.5">
                  {campaigns.map((c, i) => (
                    <div
                      key={i}
                      onClick={() => handleSend(`Tell me about the ${c.name} campaign`)}
                      className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-gray-50 cursor-pointer"
                    >
                      <div className="flex items-center gap-2">
                        {c.status === 'running' ? <Play className="w-3 h-3 text-emerald-500 fill-emerald-500" /> : <Pause className="w-3 h-3 text-amber-500" />}
                        <span className="text-sm text-gray-700">{c.name}</span>
                      </div>
                      <span className={`text-xs font-medium ${c.status === 'running' ? 'text-emerald-600' : 'text-amber-600'}`}>{c.status}</span>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <>
              <div>
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Quick Filters</h3>
                <div className="space-y-1">
                  {[
                    { key: 'at-risk', label: 'At Risk', count: '12', color: 'red' },
                    { key: 'rising', label: 'Rising', count: '456', color: 'violet' },
                    { key: 'healthy', label: 'Healthy', count: '2.8K', color: 'emerald' },
                    { key: 'new', label: 'New Users', count: '892', color: 'blue' },
                    { key: 'churned', label: 'Churned', count: '234', color: 'gray' },
                  ].map(f => (
                    <button
                      key={f.key}
                      onClick={() => setHealthFilter(healthFilter === f.key ? '' : f.key)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${
                        healthFilter === f.key ? `bg-${f.color}-50 text-${f.color}-700` : 'hover:bg-gray-50 text-gray-600'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full bg-${f.color}-500`} />
                        {f.label}
                      </span>
                      <span className="text-xs text-gray-400">{f.count}</span>
                    </button>
                  ))}
                </div>
                {healthFilter && (
                  <button onClick={() => setHealthFilter('')} className="mt-2 text-xs text-violet-600 font-medium hover:text-violet-700">
                    Clear filter
                  </button>
                )}
              </div>

              <div>
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Saved Segments</h3>
                <div className="space-y-1">
                  <button className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm text-gray-600 hover:bg-gray-50">
                    <span>🐋 Whales</span><span className="text-xs text-gray-400">48</span>
                  </button>
                  <button className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm text-gray-600 hover:bg-gray-50">
                    <span>💧 LP Providers</span><span className="text-xs text-gray-400">127</span>
                  </button>
                  <button className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm text-gray-600 hover:bg-gray-50">
                    <span>⭐ Rising Stars</span><span className="text-xs text-gray-400">456</span>
                  </button>
                </div>
              </div>
            </>
          )}
        </div>

        <div className="px-4 py-3 border-t border-gray-100">
          <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors">
            <Settings className="w-5 h-5" />
            Settings
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        {currentView === 'home' ? (
          <>
            {/* Home Header */}
            <header className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-6">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-violet-600" />
                <h1 className="text-base font-semibold text-gray-900">Home</h1>
              </div>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input type="text" placeholder="Search wallet..." className="w-52 pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500" />
                </div>
                <button className="flex items-center gap-2 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors">
                  <Wallet className="w-4 h-4 text-gray-500" />
                  <span className="text-sm font-mono text-gray-600">torrS...i8XZz</span>
                </button>
              </div>
            </header>

            {/* Protocol Metrics */}
            <div className="bg-white border-b border-gray-200 px-6 py-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-semibold text-gray-700">Protocol Overview</h2>
                <TimePeriodSelector selected={timePeriod} onChange={setTimePeriod} />
              </div>

              <div className="grid grid-cols-3 gap-4 mb-4">
                {metrics.map((metric, i) => (
                  <ProtocolMetricCard key={i} {...metric} onAskAI={() => handleSend(`Analyze my ${metric.label.toLowerCase()} metrics - currently at ${metric.value} (${metric.change} ${metric.changeLabel})`)} />
                ))}
              </div>

            </div>

            {/* Chat Area or Segment Detail View */}
            {selectedSegmentDetail ? (
              <SegmentDetailView
                segment={selectedSegmentDetail}
                onClose={() => setSelectedSegmentDetail(null)}
                onCreateCampaign={handleCampaignApproval}
              />
            ) : (
            <div className="flex-1 flex flex-col bg-gray-50">
              {messages.length === 0 ? (
                // Centered layout when no messages - enhanced with data-driven insights
                <div className="flex-1 flex items-center justify-center px-6">
                  <div className="text-center w-full max-w-2xl">
                    {/* Personalized Greeting */}
                    <p className="text-sm text-gray-500 mb-2 animate-[fadeSlideUp_0.4s_ease-out]">Good afternoon</p>
                    <h1 className="text-[2.5rem] font-light text-gray-800 mb-8 tracking-tight animate-[fadeSlideUp_0.5s_ease-out] flex items-center justify-center gap-3">
                      <TorqueLogo className="w-10 h-10 text-violet-500" />
                      Let's grow your protocol
                    </h1>

                    {/* Input Field - Hero element */}
                    <div className="animate-[fadeSlideUp_0.5s_ease-out_0.15s_both]">
                      <div className="relative bg-white rounded-2xl border border-gray-200 shadow-lg shadow-gray-200/50">
                        <input
                          type="text"
                          value={inputValue}
                          onChange={(e) => setInputValue(e.target.value)}
                          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                          placeholder="How can we drive growth today?"
                          className="w-full px-5 py-4 bg-transparent text-[15px] text-gray-800 placeholder-gray-400 focus:outline-none"
                        />
                        <div className="flex items-center justify-between px-4 pb-3">
                          <div className="flex items-center gap-1 text-xs text-gray-400">
                            <span className="px-2 py-1 bg-gray-100 rounded text-[10px] font-medium">Enter</span>
                            <span>to send</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-sm text-gray-400">Torque AI</span>
                            <button
                              onClick={() => handleSend()}
                              disabled={!inputValue.trim()}
                              className="p-2 bg-violet-600 hover:bg-violet-700 disabled:bg-gray-300 disabled:cursor-not-allowed rounded-lg transition-colors"
                            >
                              <ArrowUpRight className="w-4 h-4 text-white" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Growth Opportunities - 2x2 Grid */}
                    <div className="grid grid-cols-2 gap-3 mt-6 animate-[fadeSlideUp_0.5s_ease-out_0.25s_both]">
                      <button
                        onClick={() => handleSend("How can I retain my 12 top whales?")}
                        className="group flex items-start gap-3 p-4 bg-white hover:bg-violet-50 border border-gray-200 hover:border-violet-200 rounded-xl text-left transition-all shadow-sm hover:shadow-md"
                      >
                        <div className="w-10 h-10 rounded-lg bg-violet-100 flex items-center justify-center flex-shrink-0 group-hover:bg-violet-200 transition-colors">
                          <Shield className="w-5 h-5 text-violet-600" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-800 group-hover:text-violet-900">Retain top whales</div>
                          <div className="text-xs text-gray-500 group-hover:text-violet-700">Protect $890K in volume</div>
                        </div>
                      </button>
                      <button
                        onClick={() => handleSend("Help me re-engage 234 inactive users")}
                        className="group flex items-start gap-3 p-4 bg-white hover:bg-amber-50 border border-gray-200 hover:border-amber-200 rounded-xl text-left transition-all shadow-sm hover:shadow-md"
                      >
                        <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center flex-shrink-0 group-hover:bg-amber-200 transition-colors">
                          <Zap className="w-5 h-5 text-amber-600" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-800 group-hover:text-amber-900">Re-engage 234 users</div>
                          <div className="text-xs text-gray-500 group-hover:text-amber-700">Win back $1.2M volume</div>
                        </div>
                      </button>
                      <button
                        onClick={() => handleSend("How do I accelerate my 456 rising stars?")}
                        className="group flex items-start gap-3 p-4 bg-white hover:bg-emerald-50 border border-gray-200 hover:border-emerald-200 rounded-xl text-left transition-all shadow-sm hover:shadow-md"
                      >
                        <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center flex-shrink-0 group-hover:bg-emerald-200 transition-colors">
                          <TrendingUp className="w-5 h-5 text-emerald-600" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-800 group-hover:text-emerald-900">Accelerate rising stars</div>
                          <div className="text-xs text-gray-500 group-hover:text-emerald-700">456 users growing 127%</div>
                        </div>
                      </button>
                      <button
                        onClick={() => handleSend("Launch a campaign to convert mid-tier traders")}
                        className="group flex items-start gap-3 p-4 bg-white hover:bg-blue-50 border border-gray-200 hover:border-blue-200 rounded-xl text-left transition-all shadow-sm hover:shadow-md"
                      >
                        <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-200 transition-colors">
                          <Rocket className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-800 group-hover:text-blue-900">Launch campaign</div>
                          <div className="text-xs text-gray-500 group-hover:text-blue-700">892 ready to convert</div>
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                // Messages layout with bottom input
                <>
                  <div className="flex-1 overflow-y-auto px-6 py-8">
                    <div className="max-w-3xl mx-auto">
                      <div className="space-y-6">
                        <div className="flex justify-center">
                          <button onClick={resetHome} className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-700 bg-white hover:bg-gray-50 border border-gray-200 rounded-full shadow-sm transition-all">
                            <RefreshCw className="w-4 h-4" />
                            New Conversation
                          </button>
                        </div>
                        {messages.map((msg, i) => (
                          <Message
                            key={i}
                            {...msg}
                            onSaveSegment={() => setShowSegmentModal(true)}
                            onCreateCampaign={handleCampaignApproval}
                            onShowAll={handleShowAllUsers}
                            onExport={handleExport}
                            onShare={handleShare}
                            onInvestigate={handleInvestigate}
                            onViewSegmentDetail={(segmentData) => setSelectedSegmentDetail(segmentData)}
                          />
                        ))}
                        {isTyping && (
                          <div className="flex gap-4">
                            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
                              <Sparkles className="w-5 h-5 text-white" />
                            </div>
                            <div className="px-5 py-4 bg-white border border-gray-200 rounded-2xl rounded-bl-md shadow-sm">
                              <div className="flex gap-1.5">
                                <span className="w-2 h-2 rounded-full bg-gray-400 animate-pulse" />
                                <span className="w-2 h-2 rounded-full bg-gray-400 animate-pulse" style={{animationDelay: '0.2s'}} />
                                <span className="w-2 h-2 rounded-full bg-gray-400 animate-pulse" style={{animationDelay: '0.4s'}} />
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="bg-white border-t border-gray-200 px-6 py-5">
                    <div className="max-w-3xl mx-auto">
                      <div className="relative">
                        <input
                          type="text"
                          value={inputValue}
                          onChange={(e) => setInputValue(e.target.value)}
                          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                          placeholder="Ask me anything about your users..."
                          className="w-full px-5 py-4 pr-14 bg-gray-50 border border-gray-200 rounded-2xl text-[15px] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent focus:bg-white transition-all"
                        />
                        <button onClick={() => handleSend()} className="absolute right-2 top-1/2 -translate-y-1/2 p-3 bg-violet-600 hover:bg-violet-700 rounded-xl transition-colors">
                          <Send className="w-5 h-5 text-white" />
                        </button>
                      </div>
                      <p className="text-xs text-gray-400 text-center mt-3">Press Enter to send • AI can create segments and launch campaigns with your approval</p>
                    </div>
                  </div>
                </>
              )}
            </div>
            )}

            {/* Home Modals */}
            <MetricDetailModal metric={selectedMetric} onClose={() => setSelectedMetric(null)} onAskAI={handleSend} />
            {showSegmentModal && <SaveSegmentWithAlertModal onClose={() => setShowSegmentModal(false)} onSave={handleSaveSegmentWithAlert} />}
            {showCampaignModal && <CreateCampaignModal onClose={() => setShowCampaignModal(false)} onCreate={handleCreateCampaign} />}
            {showAllUsersModal && <ShowAllUsersModal onClose={() => setShowAllUsersModal(false)} />}
            {showCampaignApproval && <CampaignApprovalModal onClose={() => setShowCampaignApproval(false)} onAction={handleCampaignApprovalAction} />}
            {showExportModal && <ExportReportModal onClose={() => setShowExportModal(false)} onExport={handleExportAction} />}
            {showShareModal && <ShareModal onClose={() => setShowShareModal(false)} onShare={handleShareAction} />}
            {showInvestigateModal && <InvestigateMoreModal onClose={() => setShowInvestigateModal(false)} onInvestigate={handleInvestigateAction} />}
            {showAllConversations && (
              <AllConversationsPanel
                conversations={conversations}
                searchQuery={conversationSearchQuery}
                onSearchChange={setConversationSearchQuery}
                onClose={() => {
                  setShowAllConversations(false);
                  setConversationSearchQuery('');
                }}
                onSelectConversation={(c) => handleSend(c.query)}
              />
            )}
          </>
        ) : (
          <>
            {/* CRM Header */}
            <header className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-6">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-violet-600" />
                <h1 className="text-base font-semibold text-gray-900">CRM</h1>
                <span className="text-sm text-gray-400">•</span>
                <span className="text-sm text-gray-500">{filteredUsers.length.toLocaleString()} users</span>
              </div>
              <div className="flex items-center gap-3">
                <button className="flex items-center gap-2 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors">
                  <Wallet className="w-4 h-4 text-gray-500" />
                  <span className="text-sm font-mono text-gray-600">torrS...i8XZz</span>
                </button>
              </div>
            </header>

            {/* CRM Filters */}
            <div className="bg-white border-b border-gray-200 px-6 py-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search wallet..."
                      className="w-64 pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500"
                    />
                  </div>

                  <FilterDropdown label="Volume" icon={BarChart2} value={volumeFilter} onChange={setVolumeFilter} options={[
                    { value: '100k+', label: '$100K+', count: '48' },
                    { value: '10k-100k', label: '$10K - $100K', count: '892' },
                    { value: '1k-10k', label: '$1K - $10K', count: '2.1K' },
                  ]} />

                  <FilterDropdown label="Activity" icon={Activity} value={activityFilter} onChange={setActivityFilter} options={[
                    { value: 'increasing', label: 'Increasing', count: '1.2K' },
                    { value: 'stable', label: 'Stable', count: '2.4K' },
                    { value: 'declining', label: 'Declining', count: '456' },
                  ]} />

                  <FilterDropdown label="Segment" icon={Layers} value={segmentFilter} onChange={setSegmentFilter} options={[
                    { value: 'whale', label: '🐋 Whales', count: '48' },
                    { value: 'rising', label: '⭐ Rising', count: '456' },
                    { value: 'lp', label: '💧 LP Providers', count: '127' },
                  ]} />
                </div>

              </div>
            </div>

            {/* Bulk Actions */}
            {selectedUsers.size > 0 && (
              <div className="bg-violet-50 border-b border-violet-200 px-6 py-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium text-violet-700">{selectedUsers.size} user{selectedUsers.size > 1 ? 's' : ''} selected</span>
                    <button onClick={() => setSelectedUsers(new Set())} className="text-sm text-violet-600 hover:text-violet-700">Clear</button>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="flex items-center gap-2 px-3 py-1.5 bg-white border border-violet-200 rounded-lg text-sm font-medium text-violet-700 hover:bg-violet-50">
                      <Layers className="w-4 h-4" />
                      Add to Segment
                    </button>
                    <button className="flex items-center gap-2 px-3 py-1.5 bg-violet-600 hover:bg-violet-700 rounded-lg text-sm font-medium text-white">
                      <Gift className="w-4 h-4" />
                      Create Campaign
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* User Table */}
            <div className="flex-1 overflow-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200 sticky top-0">
                  <tr>
                    <th className="px-4 py-3 text-left">
                      <input type="checkbox" checked={selectedUsers.size === filteredUsers.length && filteredUsers.length > 0} onChange={toggleSelectAll} className="w-4 h-4 rounded border-gray-300 text-violet-600" />
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Wallet</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">7d Volume</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Activity</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Segments</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Health</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Last Active</th>
                    <th className="px-4 py-3 w-10"></th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {filteredUsers.map(user => (
                    <UserRow key={user.id} user={user} selected={selectedUsers.has(user.id)} onSelect={() => toggleSelectUser(user.id)} onClick={() => setSelectedUserProfile(user)} />
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="bg-white border-t border-gray-200 px-6 py-3 flex items-center justify-between">
              <span className="text-sm text-gray-500">Showing {filteredUsers.length} of 4,175 users</span>
              <div className="flex items-center gap-2">
                <button className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm text-gray-500 hover:bg-gray-50 disabled:opacity-50" disabled>Previous</button>
                <button className="px-3 py-1.5 bg-violet-600 text-white rounded-lg text-sm font-medium">1</button>
                <button className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm text-gray-700 hover:bg-gray-50">2</button>
                <button className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm text-gray-700 hover:bg-gray-50">3</button>
                <button className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm text-gray-700 hover:bg-gray-50">Next</button>
              </div>
            </div>

            {/* CRM Modals */}
            <UserProfileDrawer user={selectedUserProfile} onClose={() => setSelectedUserProfile(null)} onAskAI={(user) => { setCurrentView('home'); handleSend(`Tell me about user ${user.wallet}`); }} />
            {showSegmentBuilder && <SegmentBuilderModal onClose={() => setShowSegmentBuilder(false)} onSave={() => setShowSegmentBuilder(false)} />}
          </>
        )}
      </main>

      {/* Global Modals */}
      {showIncentiveModal && (
        <CreateIncentiveModal
          onClose={() => setShowIncentiveModal(false)}
          onCreate={(incentive) => {
            console.log('Created incentive:', incentive);
            setShowIncentiveModal(false);
            setCurrentView('home');
          }}
        />
      )}
    </div>
  );
}
