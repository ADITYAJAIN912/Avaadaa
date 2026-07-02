import type { BusinessImpactDimensions, RiskIntelligence } from '../../../../types/decisionIntelligence'

export function synthesizeImpact(impact: BusinessImpactDimensions): string | null {
  const line =
    impact.delivery ??
    impact.operational ??
    impact.financial ??
    impact.compliance ??
    impact.customer
  return line ?? null
}

export function risksByDecisionId(
  risks: RiskIntelligence[],
): Map<string, RiskIntelligence[]> {
  const map = new Map<string, RiskIntelligence[]>()
  for (const risk of risks) {
    if (!risk.relatedDecisionId) continue
    const list = map.get(risk.relatedDecisionId) ?? []
    list.push(risk)
    map.set(risk.relatedDecisionId, list)
  }
  return map
}
