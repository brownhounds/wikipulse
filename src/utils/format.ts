export const formatCompact = (n: number): string => {
    if (!Number.isFinite(n)) return '—';
    const abs = Math.abs(n);
    if (abs >= 1e9) return `${(n / 1e9).toFixed(2)}B`;
    if (abs >= 1e6) return `${(n / 1e6).toFixed(2)}M`;
    if (abs >= 1e3) return `${(n / 1e3).toFixed(1)}K`;
    return n.toFixed(0);
};

export const formatNumber = (n: number): string => {
    if (!Number.isFinite(n)) return '—';
    return n.toLocaleString('en-US');
};

export const formatSignedCompact = (n: number): string => {
    const sign = n > 0 ? '+' : n < 0 ? '-' : '';
    return `${sign}${formatCompact(Math.abs(n))}`;
};

export const formatTime = (ms: number): string => {
    const d = new Date(ms);
    const hh = d.getHours().toString().padStart(2, '0');
    const mm = d.getMinutes().toString().padStart(2, '0');
    const ss = d.getSeconds().toString().padStart(2, '0');
    return `${hh}:${mm}:${ss}`;
};

export const formatAgo = (ms: number): string => {
    const diff = Math.max(0, Date.now() - ms);
    if (diff < 60_000) return `${Math.floor(diff / 1000)}s`;
    if (diff < 3_600_000) return `${Math.floor(diff / 60_000)}m`;
    return `${Math.floor(diff / 3_600_000)}h`;
};
