// Mock API Service with Brief and Detailed breakdowns

export const fetchMockAnalysis = async (type = 'HIGH') => {
  await new Promise((resolve) => setTimeout(resolve, 1500));

  if (type === 'HIGH') {
    return {
      documentName: "RTC_Land_Record_2024.pdf",
      confidenceScore: 92,
      confidenceLevel: "HIGH",
      briefSummary: "This document confirms legal ownership under the Land Revenue Act with no active disputes or encumbrances.",
      detailedSummary: "The document is an official Record of Rights, Tenancy and Crops (RTC) issued under Section 4 of the Karnataka Land Revenue Act. Ownership is verified under Ramesh Kumar for Survey No. 104/2A. All tax records are up to date, and no bank mortgages or legal liabilities are registered against the land title.",
      keyDetails: [
        { label: "Owner Name", value: "Ramesh Kumar" },
        { label: "Survey No.", value: "104/2A" },
        { label: "Status", value: "Verified & Clear" },
        { label: "Jurisdiction", value: "North Zone Revenue Office" }
      ]
    };
  } else if (type === 'MEDIUM') {
    return {
      documentName: "Scheme_Application_Draft.pdf",
      confidenceScore: 68,
      confidenceLevel: "MEDIUM",
      briefSummary: "Partial eligibility match for the agricultural subsidy scheme; income slab needs official re-verification.",
      detailedSummary: "The applicant Sunita Devi meets 3 out of 4 eligibility criteria under PM-AGRI-2024. Land holding size aligns with small-farmer category guidelines. However, the submitted income certificate is dated over 12 months ago and requires an updated seal from the local Tehsildar office before final approval.",
      keyDetails: [
        { label: "Applicant", value: "Sunita Devi" },
        { label: "Scheme Code", value: "PM-AGRI-2024" },
        { label: "Status", value: "Needs Verification" },
        { label: "Missing Doc", value: "Income Certificate" }
      ]
    };
  } else {
    return {
      documentName: "Handwritten_Claim_Scan.jpg",
      confidenceScore: 38,
      confidenceLevel: "LOW",
      briefSummary: "Low legibility scan with ambiguous legal clauses and unverified signatures.",
      detailedSummary: "Automated OCR failed to parse handwritten text in Section 3 and Section 7 of the notice. The signature on page 2 does not match official registry records, creating high ambiguity around the property boundary dispute. Human legal oversight and re-scanning are strongly recommended.",
      keyDetails: [
        { label: "Claim Type", value: "Unverified Title Notice" },
        { label: "Confidence", value: "38% (Below Threshold)" },
        { label: "Flagged Line", value: "Signatory signature blurry" },
        { label: "Risk Level", value: "High Discrepancy" }
      ]
    };
  }
};