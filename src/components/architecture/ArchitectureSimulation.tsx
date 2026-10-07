'use client';

import * as React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Badge, ButtonDark } from '@/components/ui';
import { SPRING } from '@/lib/motion';
import { cn } from '@/lib/utils';

export type ScenarioType = '30' | '120' | '900';

export type AgentMode = 'active' | 'paused' | 'stopped';

export type SimulationState = 'idle' | 'running' | 'awaitingApproval' | 'done';

export type OutcomeType =
  | 'executed'
  | 'approved_executed'
  | 'rejected'
  | 'blocked'
  | 'paused'
  | 'stopped';

interface CheckItem {
  id: string;
  label: string;
  detail: (scenario: ScenarioType, mode: AgentMode) => string;
  pass: (scenario: ScenarioType, mode: AgentMode) => boolean | 'warning';
}

const CHECK_LIST: CheckItem[] = [
  {
    id: 'agent',
    label: 'Which agent is asking?',
    detail: (_, mode) =>
      mode === 'stopped'
        ? 'support-agent (EMERGENCY STOPPED)'
        : mode === 'paused'
        ? 'support-agent (PAUSED)'
        : 'support-agent (verified: id_91a0)',
    pass: (_, mode) => mode === 'active',
  },
  {
    id: 'perms',
    label: 'What permissions does it have?',
    detail: () => 'scope: billing:refund (granted)',
    pass: () => true,
  },
  {
    id: 'action',
    label: 'What action is it attempting?',
    detail: (s) => `POST /refunds/issue (amount: £${s})`,
    pass: () => true,
  },
  {
    id: 'risk',
    label: 'How risky is it?',
    detail: (s) =>
      s === '30'
        ? 'Risk score: 0.12 (low)'
        : s === '120'
        ? 'Risk score: 0.52 (medium)'
        : 'Risk score: 0.94 (critical)',
    pass: (s) => (s === '900' ? false : s === '120' ? 'warning' : true),
  },
  {
    id: 'limit',
    label: 'Is the amount within its limit?',
    detail: (s) =>
      s === '30'
        ? '£30 <= £50 auto-allow limit'
        : s === '120'
        ? '£120 within review tier (£50–£500)'
        : '£900 exceeds £500 ceiling',
    pass: (s) => (s === '900' ? false : s === '120' ? 'warning' : true),
  },
  {
    id: 'policy',
    label: 'Does policy permit it?',
    detail: (s) =>
      s === '900'
        ? 'Rule: max_single_refund (£500) exceeded'
        : 'Rule: tiered_refund_policy matched',
    pass: (s) => s !== '900',
  },
  {
    id: 'approval',
    label: 'Does it need human approval?',
    detail: (s) =>
      s === '30'
        ? 'No (automatic dispatch under £50)'
        : s === '120'
        ? 'Yes: requires human reviewer (£50–£500)'
        : 'No: blocked by policy ceiling',
    pass: (s) => (s === '120' ? 'warning' : true),
  },
];

interface NodeDef {
  id: number;
  name: string;
  role: string;
  description: string;
  isCenterpiece?: boolean;
}

const PIPELINE_NODES: NodeDef[] = [
  {
    id: 1,
    name: 'Agent',
    role: 'Originator',
    description: 'Any AI agent that wants to take an action.',
  },
  {
    id: 2,
    name: 'Bridle',
    role: 'Runtime Hub',
    description: 'Receives every action request and coordinates the rest.',
    isCenterpiece: true,
  },
  {
    id: 3,
    name: 'Rules you set',
    role: 'Policy Engine',
    description: 'Applies your financial limits, permissions, and approval tiers.',
  },
  {
    id: 4,
    name: 'Safety checks',
    role: 'Risk & Security',
    description: 'Evaluates context, value ceilings, and permissions before execution.',
  },
  {
    id: 5,
    name: 'Your systems',
    role: 'Target APIs',
    description: 'Shopify, billing, CRM, email, and internal tools.',
  },
];

export function ArchitectureSimulation() {
  const shouldReduceMotion = useReducedMotion();

  // State machine variables
  const [scenario, setScenario] = React.useState<ScenarioType>('120');
  const [agentMode, setAgentMode] = React.useState<AgentMode>('active');
  const [activeNode, setActiveNode] = React.useState<number>(3);
  const [simState, setSimState] = React.useState<SimulationState>('awaitingApproval');
  const [resolvedChecks, setResolvedChecks] = React.useState<number>(CHECK_LIST.length);
  const [outcome, setOutcome] = React.useState<OutcomeType | null>(null);
  const [auditTimestamp, setAuditTimestamp] = React.useState<string>('2026-09-28 22:00:00 UTC');
  const [statusAnnouncement, setStatusAnnouncement] = React.useState<string>(
    'Refund of £120 paused at Rules you set. Awaiting human approval.'
  );
  const [selectedNodeInfo, setSelectedNodeInfo] = React.useState<number | null>(null);

  // Generate current timestamp for audit log
  const generateTimestamp = () => {
    const now = new Date();
    return now.toISOString().replace('T', ' ').substring(0, 19) + ' UTC';
  };

  // Run or re-run simulation
  const runSimulation = React.useCallback(
    (scen: ScenarioType, mode: AgentMode) => {
      setSimState('running');
      setOutcome(null);
      setResolvedChecks(0);
      setAuditTimestamp(generateTimestamp());
      setStatusAnnouncement(`Simulation started for refund £${scen}.`);

      if (shouldReduceMotion) {
        // Fast path for reduced motion
        if (mode === 'stopped') {
          setActiveNode(2);
          setResolvedChecks(1);
          setOutcome('stopped');
          setSimState('done');
          setStatusAnnouncement('Emergency stop active. Agent disabled and event logged.');
          return;
        }

        if (mode === 'paused') {
          setActiveNode(2);
          setResolvedChecks(1);
          setOutcome('paused');
          setSimState('done');
          setStatusAnnouncement('Agent paused. Request held at Bridle.');
          return;
        }

        if (scen === '30') {
          setActiveNode(5);
          setResolvedChecks(CHECK_LIST.length);
          setOutcome('executed');
          setSimState('done');
          setStatusAnnouncement('Refund of £30 approved and executed.');
        } else if (scen === '120') {
          setActiveNode(3);
          setResolvedChecks(CHECK_LIST.length);
          setSimState('awaitingApproval');
          setStatusAnnouncement('Refund of £120 paused at Rules you set. Awaiting human approval.');
        } else {
          setActiveNode(3);
          setResolvedChecks(CHECK_LIST.length);
          setOutcome('blocked');
          setSimState('done');
          setStatusAnnouncement('Refund of £900 blocked by policy ceiling.');
        }
        return;
      }

      // Animated multi-step progression
      setActiveNode(1);

      // Node 1 (Agent) -> Node 2 (Bridle)
      setTimeout(() => {
        setActiveNode(2);
        setResolvedChecks(1);

        if (mode === 'stopped') {
          setTimeout(() => {
            setOutcome('stopped');
            setSimState('done');
            setStatusAnnouncement('Emergency stop active. Agent disabled and event logged.');
          }, 500);
          return;
        }

        if (mode === 'paused') {
          setTimeout(() => {
            setOutcome('paused');
            setSimState('done');
            setStatusAnnouncement('Agent paused. Request held at Bridle.');
          }, 500);
          return;
        }

        // Node 2 (Bridle) -> Node 3 (Rules you set)
        setTimeout(() => {
          setActiveNode(3);
          setResolvedChecks(3);

          if (scen === '900') {
            setTimeout(() => {
              setResolvedChecks(CHECK_LIST.length);
              setOutcome('blocked');
              setSimState('done');
              setStatusAnnouncement('Refund of £900 blocked by policy ceiling.');
            }, 600);
            return;
          }

          // Node 3 -> Node 4 (Safety checks)
          setTimeout(() => {
            setActiveNode(4);
            setResolvedChecks(CHECK_LIST.length);

            if (scen === '120') {
              setTimeout(() => {
                setActiveNode(3); // Pauses at rules approval gate
                setSimState('awaitingApproval');
                setStatusAnnouncement('Refund of £120 requires human approval.');
              }, 600);
              return;
            }

            // Node 4 -> Node 5 (Your systems)
            setTimeout(() => {
              setActiveNode(5);
              setOutcome('executed');
              setSimState('done');
              setStatusAnnouncement('Refund of £30 executed in Your systems.');
            }, 600);
          }, 600);
        }, 600);
      }, 500);
    },
    [shouldReduceMotion]
  );

  // Trigger when scenario changes
  const handleSelectScenario = (scen: ScenarioType) => {
    setScenario(scen);
    runSimulation(scen, agentMode);
  };

  // Trigger when agent mode changes
  const handleSetAgentMode = (mode: AgentMode) => {
    setAgentMode(mode);
    runSimulation(scenario, mode);
  };

  // Handle human review choices for £120 scenario
  const handleHumanDecision = (decision: 'approve' | 'deny') => {
    if (decision === 'approve') {
      setStatusAnnouncement('Human reviewer approved refund £120. Executing in Your systems.');
      if (shouldReduceMotion) {
        setActiveNode(5);
        setOutcome('approved_executed');
        setSimState('done');
        return;
      }
      setActiveNode(4);
      setTimeout(() => {
        setActiveNode(5);
        setOutcome('approved_executed');
        setSimState('done');
      }, 600);
    } else {
      setStatusAnnouncement('Human reviewer denied refund £120. Action rejected.');
      setOutcome('rejected');
      setSimState('done');
    }
  };

  return (
    <div className="w-full">
      {/* Hidden aria-live region for accessibility */}
      <div className="sr-only" aria-live="polite" role="status">
        {statusAnnouncement}
      </div>

      {/* Top Controls: Scenario Selector & Agent Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 border-b border-white/10">
        {/* Scenario Buttons */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          <span className="type-mono-label text-mute text-xs tracking-wider shrink-0">
            TEST SCENARIO:
          </span>
          <div className="flex flex-wrap sm:inline-flex rounded-full p-1 bg-ink-2 border border-white/10 gap-1 sm:gap-0" role="group" aria-label="Action test scenarios">
            <button
              type="button"
              onClick={() => handleSelectScenario('30')}
              aria-pressed={scenario === '30'}
              className={cn(
                'min-h-[44px] sm:min-h-[36px] px-4 py-2 rounded-full text-xs font-mono font-medium active:scale-[0.97] touch-manipulation transition-[background-color,border-color,color,transform,box-shadow] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] cursor-pointer flex-1 sm:flex-initial flex items-center justify-center',
                scenario === '30'
                  ? 'bg-paper text-ink shadow-sm'
                  : 'text-mute hover:text-paper hover:bg-white/5'
              )}
            >
              Refund £30 (Allowed)
            </button>
            <button
              type="button"
              onClick={() => handleSelectScenario('120')}
              aria-pressed={scenario === '120'}
              className={cn(
                'min-h-[44px] sm:min-h-[36px] px-4 py-2 rounded-full text-xs font-mono font-medium active:scale-[0.97] touch-manipulation transition-[background-color,border-color,color,transform,box-shadow] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] cursor-pointer flex-1 sm:flex-initial flex items-center justify-center',
                scenario === '120'
                  ? 'bg-paper text-ink shadow-sm'
                  : 'text-mute hover:text-paper hover:bg-white/5'
              )}
            >
              Refund £120 (Needs approval)
            </button>
            <button
              type="button"
              onClick={() => handleSelectScenario('900')}
              aria-pressed={scenario === '900'}
              className={cn(
                'min-h-[44px] sm:min-h-[36px] px-4 py-2 rounded-full text-xs font-mono font-medium active:scale-[0.97] touch-manipulation transition-[background-color,border-color,color,transform,box-shadow] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] cursor-pointer flex-1 sm:flex-initial flex items-center justify-center',
                scenario === '900'
                  ? 'bg-paper text-ink shadow-sm'
                  : 'text-mute hover:text-paper hover:bg-white/5'
              )}
            >
              Refund £900 (Blocked)
            </button>
          </div>
        </div>

        {/* Agent State & Control Group (Pause / Emergency stop) */}
        <div className="flex flex-wrap items-center gap-2.5">
          <span className="type-mono-label text-mute text-xs tracking-wider shrink-0">
            AGENT CONTROL:
          </span>

          <div className="inline-flex items-center rounded-full p-1 bg-ink-2 border border-white/10 gap-1">
            {/* Active Mode */}
            <button
              type="button"
              onClick={() => handleSetAgentMode('active')}
              aria-pressed={agentMode === 'active'}
              aria-label="Set agent to active"
              className={cn(
                'inline-flex items-center gap-2 px-3 py-1.5 min-h-[44px] sm:min-h-[34px] rounded-full font-mono text-xs font-medium active:scale-[0.97] touch-manipulation transition-[background-color,border-color,color,transform,box-shadow] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] cursor-pointer',
                agentMode === 'active'
                  ? 'bg-allow/20 border border-allow/60 text-allow shadow-sm'
                  : 'text-mute hover:text-paper'
              )}
            >
              <span className={cn('w-2 h-2 rounded-full', agentMode === 'active' ? 'bg-allow' : 'bg-white/20')} />
              <span>Active</span>
            </button>

            {/* Pause Agent Mode */}
            <button
              type="button"
              onClick={() => handleSetAgentMode(agentMode === 'paused' ? 'active' : 'paused')}
              aria-pressed={agentMode === 'paused'}
              aria-label="Pause agent action processing"
              className={cn(
                'inline-flex items-center gap-2 px-3 py-1.5 min-h-[44px] sm:min-h-[34px] rounded-full font-mono text-xs font-medium active:scale-[0.97] touch-manipulation transition-[background-color,border-color,color,transform,box-shadow] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] cursor-pointer',
                agentMode === 'paused'
                  ? 'bg-approve/25 border border-approve/70 text-approve shadow-sm'
                  : 'text-mute hover:text-paper'
              )}
            >
              <span className={cn('w-2 h-2 rounded-full', agentMode === 'paused' ? 'bg-approve animate-pulse' : 'bg-white/20')} />
              <span>Pause agent</span>
            </button>

            {/* Emergency Stop Mode */}
            <button
              type="button"
              onClick={() => handleSetAgentMode(agentMode === 'stopped' ? 'active' : 'stopped')}
              aria-pressed={agentMode === 'stopped'}
              aria-label="Emergency stop: halt and disable agent immediately"
              className={cn(
                'inline-flex items-center gap-2 px-3 py-1.5 min-h-[44px] sm:min-h-[34px] rounded-full font-mono text-xs font-medium active:scale-[0.97] touch-manipulation transition-[background-color,border-color,color,transform,box-shadow] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] cursor-pointer',
                agentMode === 'stopped'
                  ? 'bg-block/25 border border-block/70 text-block shadow-sm'
                  : 'text-mute hover:text-paper'
              )}
            >
              <span className={cn('w-2 h-2 rounded-full', agentMode === 'stopped' ? 'bg-block animate-pulse' : 'bg-white/20')} />
              <span>Emergency stop</span>
            </button>
          </div>
        </div>
      </div>

      {/* Illustrative Policy Rule Caption */}
      <div className="py-3 text-xs font-mono text-mute flex flex-wrap items-center justify-between gap-2 border-b border-white/5">
        <span className="text-paper/90">
          Up to £50: allowed. £50 to £500: human approval. Over £500: blocked.
        </span>
        <span className="text-mute/60">
          Source: support-agent {'//'} Target: Shopify & Billing API
        </span>
      </div>

      {/* Main Pipeline & Decision Area */}
      <div className="mt-8 grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
        {/* Pipeline Layout (Left to right desktop, vertical stack mobile) */}
        <div className="xl:col-span-8 flex flex-col gap-4">
          {/* Boundary Tag */}
          <div className="flex items-center justify-between text-xs font-mono text-mute">
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-brass" />
              <span>EXECUTION PIPELINE</span>
            </span>
            <span className="text-xs text-mute/80 tracking-wider">
              {simState === 'running' && 'PROCESSING ACTION...'}
              {simState === 'awaitingApproval' && 'PAUSED FOR HUMAN REVIEW'}
              {simState === 'done' && 'DECISION COMPLETE'}
              {simState === 'idle' && 'READY'}
            </span>
          </div>

          {/* Pipeline Canvas */}
          <div className="relative rounded-[6px] bg-ink-2/90 border border-white/10 p-5 sm:p-7">
            {/* "Inside Bridle" Bracket / Boundary indicator covering Nodes 2 through 4 */}
            <div
              className="hidden lg:block absolute top-2 bottom-2 left-[21%] right-[21%] pointer-events-none rounded-[4px] border border-dashed border-brass/35 bg-brass/[0.02]"
              aria-hidden="true"
            >
              <span className="absolute -top-3 left-4 px-2 py-0.5 rounded-[2px] bg-ink-2 border border-brass/40 font-mono text-xs text-brass uppercase tracking-widest">
                Inside Bridle Control Layer
              </span>
            </div>

            {/* Mobile "Inside Bridle" Indicator */}
            <div className="lg:hidden mb-4 p-2.5 rounded bg-brass/10 border border-brass/30 text-center font-mono text-xs text-brass">
              Nodes 2–4 operate securely Inside Bridle
            </div>

            {/* Five Nodes Container */}
            <div className="relative grid grid-cols-1 lg:grid-cols-5 gap-3 lg:gap-2.5 items-stretch">
              {PIPELINE_NODES.map((node) => {
                const isActive = activeNode === node.id;
                const isPast = activeNode > node.id;
                const isFinalApproved =
                  node.id === 5 && (outcome === 'executed' || outcome === 'approved_executed');
                const isBlockedHere =
                  (node.id === 3 && outcome === 'blocked') ||
                  (node.id === 2 && (outcome === 'stopped' || outcome === 'paused')) ||
                  (node.id === 3 && outcome === 'rejected');
                const isSelected = selectedNodeInfo === node.id;

                return (
                  <div
                    key={node.id}
                    onClick={() => setSelectedNodeInfo(isSelected ? null : node.id)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setSelectedNodeInfo(isSelected ? null : node.id);
                      }
                    }}
                    tabIndex={0}
                    role="button"
                    aria-label={`${node.name}: ${node.description}`}
                    className={cn(
                      'group relative rounded-[4px] p-3 transition-[background-color,border-color,ring-color,box-shadow,transform] duration-180 ease-[cubic-bezier(0.23,1,0.32,1)] cursor-pointer text-left active:scale-[0.98]',
                      'focus-visible:outline-2 focus-visible:outline-[var(--color-brass)] focus-visible:outline-offset-2',
                      node.isCenterpiece
                        ? 'bg-ink border-2 border-brass/70 shadow-[0_0_15px_rgba(168,131,74,0.15)] ring-1 ring-brass/30'
                        : 'bg-ink/80 border border-white/10 hover:border-white/20',
                      isActive && 'ring-2 ring-brass',
                      isFinalApproved && 'border-allow ring-1 ring-allow bg-allow/10',
                      isBlockedHere && 'border-block ring-1 ring-block bg-block/10'
                    )}
                  >
                    {/* Node Header */}
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-mono text-xs text-mute">
                        0{node.id}
                      </span>
                      {isActive && (
                        <motion.span
                          layoutId="packet"
                          className="w-2 h-2 rounded-full bg-brass shadow-[0_0_8px_rgba(168,131,74,0.9)]"
                          transition={shouldReduceMotion ? { duration: 0 } : SPRING.snappy}
                        />
                      )}
                      {!isActive && isPast && (
                        <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
                      )}
                    </div>

                    {/* Node Title & Role */}
                    <div className="font-mono text-xs font-semibold text-paper group-hover:text-brass transition-colors truncate">
                      {node.name}
                    </div>
                    <div className="font-mono text-xs text-mute truncate mt-0.5">
                      {node.role}
                    </div>

                    {/* Hover/Tap Description Drawer */}
                    <div
                      className={cn(
                        'mt-2.5 pt-2 border-t border-white/10 text-xs font-sans text-mute/90 leading-tight transition-all',
                        isSelected ? 'block' : 'hidden lg:group-hover:block'
                      )}
                    >
                      {node.description}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Interactive Human Approval Card (Appears during £120 scenario) */}
          {simState === 'awaitingApproval' && (
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
              className="p-5 rounded-[4px] bg-approve/10 border border-approve/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-2"
            >
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-2 h-2 rounded-full bg-approve animate-pulse" />
                  <span className="type-mono-label text-approve text-xs font-semibold">
                    HUMAN APPROVAL REQUIRED
                  </span>
                </div>
                <p className="text-sm font-sans text-paper">
                  <span className="font-mono font-medium">support-agent</span> requests a{' '}
                  <span className="font-mono font-semibold text-paper">£120</span> refund for customer account #4810.
                </p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <ButtonDark
                  variant="primary"
                  size="lg"
                  onClick={() => handleHumanDecision('approve')}
                  className="bg-allow text-paper hover:bg-allow/90 border-0"
                >
                  Approve (£120)
                </ButtonDark>
                <ButtonDark
                  variant="secondary"
                  size="lg"
                  onClick={() => handleHumanDecision('deny')}
                  className="hover:border-block text-block border-block/40"
                >
                  Deny
                </ButtonDark>
              </div>
            </motion.div>
          )}

          {/* Outcome Status Banner */}
          {outcome && (
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
              className={cn(
                'p-4 rounded-[4px] border flex items-center justify-between text-xs font-mono',
                outcome === 'executed' && 'bg-allow/10 border-allow/40 text-allow',
                outcome === 'approved_executed' && 'bg-allow/10 border-allow/40 text-allow',
                outcome === 'blocked' && 'bg-block/10 border-block/40 text-block',
                outcome === 'rejected' && 'bg-block/10 border-block/40 text-block',
                outcome === 'paused' && 'bg-approve/10 border-approve/40 text-approve',
                outcome === 'stopped' && 'bg-block/10 border-block/40 text-block'
              )}
            >
              <div className="flex items-center gap-2.5">
                <span
                  className={cn(
                    'w-2 h-2 rounded-full',
                    outcome === 'executed' || outcome === 'approved_executed'
                      ? 'bg-allow'
                      : outcome === 'paused'
                      ? 'bg-approve'
                      : 'bg-block'
                  )}
                />
                <span className="font-semibold uppercase tracking-wider">
                  {outcome === 'executed' && 'Action Executed — £30 Refund Dispatched'}
                  {outcome === 'approved_executed' && 'Human Approved — £120 Refund Executed'}
                  {outcome === 'blocked' && 'Blocked By Policy — Amount (£900) Exceeds £500 Ceiling'}
                  {outcome === 'rejected' && 'Rejected by Reviewer — Action Dropped'}
                  {outcome === 'paused' && 'Agent Paused — Execution Held at Bridle'}
                  {outcome === 'stopped' && 'Emergency Stop — Agent Disabled and Action Logged'}
                </span>
              </div>
              <span className="text-paper/70 text-xs">
                {outcome === 'executed' || outcome === 'approved_executed'
                  ? 'Target: Shopify & Billing'
                  : 'Target: UNTOUCHED'}
              </span>
            </motion.div>
          )}
        </div>

        {/* Decision Checks Panel */}
        <div className="xl:col-span-4 rounded-[6px] bg-ink-2/90 border border-white/10 p-5 sm:p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-white/10">
              <span className="type-mono-label text-mute text-xs tracking-wider">
                DECISION ENGINE CHECKS
              </span>
              <Badge dark className="text-xs">
                {resolvedChecks} / {CHECK_LIST.length}
              </Badge>
            </div>

            <div className="space-y-3.5">
              {CHECK_LIST.map((item, idx) => {
                const isResolved = resolvedChecks > idx;
                const status = item.pass(scenario, agentMode);

                return (
                  <div
                    key={item.id}
                    className={cn(
                      'text-xs font-mono transition-opacity duration-200',
                      isResolved ? 'opacity-100' : 'opacity-30'
                    )}
                  >
                    <div className="flex items-center justify-between text-paper/90 mb-0.5">
                      <span>{item.label}</span>
                      {isResolved && (
                        <span>
                          {status === true && (
                            <span className="text-allow font-bold">✓ PASS</span>
                          )}
                          {status === 'warning' && (
                            <span className="text-approve font-bold">! REVIEW</span>
                          )}
                          {status === false && (
                            <span className="text-block font-bold">✕ BLOCK</span>
                          )}
                        </span>
                      )}
                    </div>
                    {isResolved && (
                      <div className="text-xs text-mute font-sans">
                        {item.detail(scenario, agentMode)}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-white/10 text-xs font-mono text-mute flex items-center justify-between">
            <span>VERIFICATION: DETERMINISTIC</span>
            <span className="text-brass">ZERO DIRECT ACCESS</span>
          </div>
        </div>
      </div>

      {/* Generated Audit Entry Log */}
      <div className="mt-8 rounded-[6px] bg-ink-2/60 border border-white/10 p-5">
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10">
          <span className="type-mono-label text-mute text-xs tracking-wider">
            Audit trail: a record of what happened
          </span>
          <span className="font-mono text-xs text-mute">
            LOG_ID: #ev_{Math.abs(scenario.split('').reduce((a, b) => a + b.charCodeAt(0), 1024))}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 text-xs font-mono">
          <div>
            <div className="text-mute/60 text-xs">AGENT</div>
            <div className="text-paper truncate">support-agent</div>
          </div>
          <div>
            <div className="text-mute/60 text-xs">ACTION</div>
            <div className="text-paper truncate">issue_refund</div>
          </div>
          <div>
            <div className="text-mute/60 text-xs">AMOUNT</div>
            <div className="text-paper truncate">£{scenario}</div>
          </div>
          <div>
            <div className="text-mute/60 text-xs">TIMESTAMP</div>
            <div className="text-paper truncate">{auditTimestamp}</div>
          </div>
          <div>
            <div className="text-mute/60 text-xs">TOOL</div>
            <div className="text-paper truncate">shopify.refund</div>
          </div>
          <div>
            <div className="text-mute/60 text-xs">APPROVAL</div>
            <div className="text-paper truncate">
              {outcome === 'approved_executed'
                ? 'human_authorised'
                : outcome === 'rejected'
                ? 'human_denied'
                : outcome === 'paused'
                ? 'agent_paused'
                : outcome === 'stopped'
                ? 'emergency_stop_logged'
                : outcome === 'blocked'
                ? 'policy_blocked'
                : 'auto_policy'}
            </div>
          </div>
          <div>
            <div className="text-mute/60 text-xs">RESULT</div>
            <div
              className={cn(
                'font-bold truncate uppercase',
                outcome === 'executed' || outcome === 'approved_executed'
                  ? 'text-allow'
                  : outcome === 'paused'
                  ? 'text-approve'
                  : 'text-block'
              )}
            >
              {outcome || (simState === 'awaitingApproval' ? 'PENDING' : 'PROCESSING')}
            </div>
          </div>
        </div>
      </div>

      {/* Honesty Notice Caption */}
      <div className="mt-4 text-center type-mono-label text-mute text-xs tracking-wider">
        Illustrative simulation. Policy thresholds are examples. Each business defines its own.
      </div>
    </div>
  );
}
