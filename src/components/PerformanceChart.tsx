import React, { useState } from 'react';
import { motion } from 'motion/react';
import { BarChart3, LineChart as LineChartIcon, CheckCircle, TrendingUp, Info } from 'lucide-react';
import { PerformanceTopic } from '../types';

interface PerformanceChartProps {
  topics?: PerformanceTopic[];
  studentData?: {
    aptitudeProgress: number;
    codingProgress: number;
    categoryQuestionsSolved?: {
      reasoning?: number;
      verbal?: number;
      aptitude?: number;
      coding?: number;
    };
  };
}

export const PerformanceChart: React.FC<PerformanceChartProps> = ({
  topics,
  studentData,
}) => {

  const [chartType, setChartType] = useState<'bar' | 'line'>('bar');
  const [hoveredTopic, setHoveredTopic] = useState<string | null>(null);

  // SVG dimensions for Line Chart
  const svgWidth = 540;
  const svgHeight = 220;
  const paddingX = 45;
  const paddingY = 30;
  const graphWidth = svgWidth - paddingX * 2;
  const graphHeight = svgHeight - paddingY * 2;

  // Weeks for line chart trends
  const weeks = ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Current'];
  const chartTopics: PerformanceTopic[] = topics ?? [
  {
    topic: 'Aptitude',
    score: studentData?.aptitudeProgress ?? 0,
    benchmark: 70,
    recentScores: [0, 0, 0, 0, studentData?.aptitudeProgress ?? 0],
    color: '#4f46e5',
  },
  {
    topic: 'Logical Reasoning',
    score: 0,
    benchmark: 75,
    recentScores: [0, 0, 0, 0, 0],
    color: '#0ea5e9',
  },
  {
    topic: 'Verbal Ability',
    score: 0,
    benchmark: 65,
    recentScores: [0, 0, 0, 0, 0],
    color: '#10b981',
  },
  {
    topic: 'Coding',
    score: studentData?.codingProgress ?? 0,
    benchmark: 65,
    recentScores: [0, 0, 0, 0, studentData?.codingProgress ?? 0],
    color: '#f59e0b',
  },
];

  return (
    <div
      id="performance-section"
      className="rounded-2xl border border-slate-200/80 bg-white p-5 sm:p-6 shadow-sm"
    >
      {/* Header with Title & Chart Mode Toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-base sm:text-lg font-bold text-slate-900">
              Placement Performance Breakdown
            </h3>
            {chartTopics.some((t) => t.score > 0) ? (
              <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-bold text-emerald-700">
                Above College Cutoff
              </span>
            ) : (
              <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-bold text-slate-600">
                Evaluation Pending
              </span>
            )}
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Subject-wise accuracy and evaluation across all completed assessments
          </p>
        </div>

        {/* View Toggle */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl self-start sm:self-auto">
          <button
            id="chart-view-bar-btn"
            type="button"
            onClick={() => setChartType('bar')}
            className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-semibold transition-all cursor-pointer ${
              chartType === 'bar'
                ? 'bg-white text-indigo-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <BarChart3 className="h-3.5 w-3.5" />
            <span>Topic Bars</span>
          </button>
          <button
            id="chart-view-line-btn"
            type="button"
            onClick={() => setChartType('line')}
            className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-semibold transition-all cursor-pointer ${
              chartType === 'line'
                ? 'bg-white text-indigo-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <LineChartIcon className="h-3.5 w-3.5" />
            <span>Weekly Trend</span>
          </button>
        </div>
      </div>

      {/* Metric Badges Quick Bar */}
      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {chartTopics.map((t) => (
          <div
            key={t.topic}
            onMouseEnter={() => setHoveredTopic(t.topic)}
            onMouseLeave={() => setHoveredTopic(null)}
            className={`rounded-xl border p-3 transition-all cursor-pointer ${
              hoveredTopic === t.topic
                ? 'border-indigo-400 bg-indigo-50/50 shadow-xs'
                : 'border-slate-100 bg-slate-50/60 hover:border-slate-200'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-600">{t.topic}</span>
              <span className="text-[11px] font-semibold text-emerald-600">
                +{t.score - t.recentScores[0]}%
              </span>
            </div>
            <div className="mt-1.5 flex items-baseline gap-1.5">
              <span className="text-xl font-bold text-slate-900">{t.score}%</span>
              <span className="text-[10px] text-slate-400">/ 100%</span>
            </div>
            <div className="mt-1 flex items-center gap-1 text-[10px] text-slate-500">
              <span
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: t.color }}
              />
              <span>Cutoff: {t.benchmark}%</span>
            </div>
          </div>
        ))}
      </div>

      {/* Visual Chart Area */}
      <div className="mt-6">
        {chartType === 'bar' ? (
          /* Bar Chart View */
          <div className="space-y-4">
            {chartTopics.map((t) => {
              const isHovered = hoveredTopic === t.topic;

              return (
                <div
                  key={t.topic}
                  onMouseEnter={() => setHoveredTopic(t.topic)}
                  onMouseLeave={() => setHoveredTopic(null)}
                  className="space-y-1.5"
                >
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span
                        className="h-2.5 w-2.5 rounded-full"
                        style={{ backgroundColor: t.color }}
                      />
                      <span className="font-bold text-slate-800">{t.topic}</span>
                      <span className="text-[11px] text-slate-400">
                        (Recruiter Benchmark: {t.benchmark}%)
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900 text-sm">{t.score}%</span>
                      {t.score >= t.benchmark ? (
                        <span className="rounded bg-emerald-100 px-1.5 py-0.5 text-[10px] font-bold text-emerald-800">
                          Cleared
                        </span>
                      ) : t.score === 0 ? (
                        <span className="rounded bg-slate-100 px-1.5 py-0.5 text-[10px] font-bold text-slate-600">
                          Not Started
                        </span>
                      ) : (
                        <span className="rounded bg-amber-100 px-1.5 py-0.5 text-[10px] font-bold text-amber-800">
                          Needs Practice
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Relative Dual Bar Container */}
                  <div className="relative h-4 w-full rounded-full bg-slate-100 overflow-hidden">
                    {/* Benchmark Cutoff Line Indicator */}
                    <div
                      className="absolute top-0 bottom-0 w-0.5 bg-slate-400/80 z-10"
                      style={{ left: `${t.benchmark}%` }}
                      title={`Target Cutoff: ${t.benchmark}%`}
                    />

                    {/* Animated Score Bar */}
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${t.score}%` }}
                      transition={{ duration: 0.8, ease: 'easeOut' }}
                      className="h-full rounded-full transition-all"
                      style={{
                        backgroundColor: t.color,
                        filter: isHovered ? 'brightness(1.1)' : 'none',
                      }}
                    />
                  </div>
                </div>
              );
            })}

            {/* Cutoff Legend */}
            <div className="flex items-center justify-end gap-4 pt-2 text-[11px] text-slate-400">
              <div className="flex items-center gap-1.5">
                <div className="h-0.5 w-4 bg-slate-400" />
                <span>Tier 1 Recruiter Minimum Cutoff (70%)</span>
              </div>
            </div>
          </div>
        ) : (
          /* SVG Multi-Line Trend Chart View */
          <div className="w-full overflow-x-auto">
            <svg
              viewBox={`0 0 ${svgWidth} ${svgHeight}`}
              className="w-full h-56 text-xs select-none"
            >
              {/* Grid Lines */}
              {[100, 80, 60, 40, 20].map((val) => {
                const y = paddingY + graphHeight * (1 - val / 100);
                return (
                  <g key={val}>
                    <line
                      x1={paddingX}
                      y1={y}
                      x2={svgWidth - paddingX}
                      y2={y}
                      stroke="#f1f5f9"
                      strokeDasharray="4 4"
                      strokeWidth="1"
                    />
                    <text
                      x={paddingX - 8}
                      y={y + 3}
                      fill="#94a3b8"
                      textAnchor="end"
                      className="text-[10px] font-medium"
                    >
                      {val}%
                    </text>
                  </g>
                );
              })}

              {/* Recruiter Threshold Line (70%) */}
              <line
                x1={paddingX}
                y1={paddingY + graphHeight * (1 - 70 / 100)}
                x2={svgWidth - paddingX}
                y2={paddingY + graphHeight * (1 - 70 / 100)}
                stroke="#cbd5e1"
                strokeWidth="1.5"
                strokeDasharray="6 3"
              />
              <text
                x={svgWidth - paddingX}
                y={paddingY + graphHeight * (1 - 70 / 100) - 5}
                fill="#64748b"
                textAnchor="end"
                className="text-[9px] font-semibold"
              >
                Recruiter Target (70%)
              </text>

              {/* Data Lines for each topic */}
              {chartTopics.map((t) => {
                const points = t.recentScores.map((score, i) => {
                  const x = paddingX + (i / (t.recentScores.length - 1)) * graphWidth;
                  const y = paddingY + graphHeight * (1 - score / 100);
                  return `${x},${y}`;
                });
                const pathData = `M ${points.join(' L ')}`;
                const isHovered = hoveredTopic === t.topic;

                return (
                  <g key={t.topic}>
                    <motion.path
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 1, ease: 'easeOut' }}
                      d={pathData}
                      fill="none"
                      stroke={t.color}
                      strokeWidth={isHovered ? 3.5 : 2.5}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    {/* Points on line */}
                    {t.recentScores.map((score, idx) => {
                      const cx = paddingX + (idx / (t.recentScores.length - 1)) * graphWidth;
                      const cy = paddingY + graphHeight * (1 - score / 100);
                      return (
                        <circle
                          key={idx}
                          cx={cx}
                          cy={cy}
                          r={idx === t.recentScores.length - 1 ? 5 : 3.5}
                          fill="#ffffff"
                          stroke={t.color}
                          strokeWidth="2"
                          className="transition-all hover:scale-125 cursor-pointer"
                        >
                          <title>{`${t.topic} (${weeks[idx]}): ${score}%`}</title>
                        </circle>
                      );
                    })}
                  </g>
                );
              })}

              {/* X-Axis Labels */}
              {weeks.map((week, idx) => {
                const x = paddingX + (idx / (weeks.length - 1)) * graphWidth;
                return (
                  <text
                    key={week}
                    x={x}
                    y={svgHeight - 8}
                    fill="#64748b"
                    textAnchor="middle"
                    className="text-[10px] font-semibold"
                  >
                    {week}
                  </text>
                );
              })}
            </svg>

            {/* Legend */}
            <div className="flex flex-wrap items-center justify-center gap-4 mt-2 pt-2 border-t border-slate-100">
              {chartTopics.map((t) => (
                <div
                  key={t.topic}
                  onMouseEnter={() => setHoveredTopic(t.topic)}
                  onMouseLeave={() => setHoveredTopic(null)}
                  className="flex items-center gap-1.5 cursor-pointer"
                >
                  <span
                    className="h-2.5 w-2.5 rounded-full"
                    style={{ backgroundColor: t.color }}
                  />
                  <span className="text-xs font-semibold text-slate-700">
                    {t.topic}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
