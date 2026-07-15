import { create } from 'zustand';
import { initialResumeState } from '../types/ResumeSchema';

export const useResumeStore = create((set, get) => ({
  resumeData: { ...initialResumeState },

  // Set the entire resume data (useful for loading from DB)
  setResumeData: (data) => set({ resumeData: { ...initialResumeState, ...data } }),

  // Update a specific root field (e.g., summary, templateConfig)
  updateField: (field, value) => set((state) => ({
    resumeData: {
      ...state.resumeData,
      [field]: value
    }
  })),

  // Update a specific nested field (e.g., personalInfo.fullName)
  updateNestedField: (section, field, value) => set((state) => ({
    resumeData: {
      ...state.resumeData,
      [section]: {
        ...state.resumeData[section],
        [field]: value
      }
    }
  })),

  // Array operations for list sections like experience, education
  addArrayItem: (section, emptyItem) => set((state) => ({
    resumeData: {
      ...state.resumeData,
      [section]: [...(state.resumeData[section] || []), emptyItem]
    }
  })),

  updateArrayItem: (section, index, field, value) => set((state) => {
    const newArray = [...(state.resumeData[section] || [])];
    newArray[index] = { ...newArray[index], [field]: value };
    return {
      resumeData: {
        ...state.resumeData,
        [section]: newArray
      }
    };
  }),

  removeArrayItem: (section, index) => set((state) => {
    const newArray = [...(state.resumeData[section] || [])];
    newArray.splice(index, 1);
    return {
      resumeData: {
        ...state.resumeData,
        [section]: newArray
      }
    };
  }),
  
  // Custom Section operations
  addCustomSection: (emptySection) => set((state) => ({
    resumeData: {
      ...state.resumeData,
      customSections: [...(state.resumeData.customSections || []), emptySection]
    }
  })),

  updateCustomSectionTitle: (sectionIndex, title) => set((state) => {
    const newCustom = [...(state.resumeData.customSections || [])];
    newCustom[sectionIndex] = { ...newCustom[sectionIndex], title };
    return {
      resumeData: {
        ...state.resumeData,
        customSections: newCustom
      }
    };
  }),

  addCustomSectionItem: (sectionIndex, emptyItem) => set((state) => {
    const newCustom = [...(state.resumeData.customSections || [])];
    newCustom[sectionIndex] = {
      ...newCustom[sectionIndex],
      items: [...(newCustom[sectionIndex].items || []), emptyItem]
    };
    return {
      resumeData: {
        ...state.resumeData,
        customSections: newCustom
      }
    };
  }),

  updateCustomSectionItem: (sectionIndex, itemIndex, field, value) => set((state) => {
    const newCustom = [...(state.resumeData.customSections || [])];
    const newItems = [...(newCustom[sectionIndex].items || [])];
    newItems[itemIndex] = { ...newItems[itemIndex], [field]: value };
    newCustom[sectionIndex] = { ...newCustom[sectionIndex], items: newItems };
    return {
      resumeData: {
        ...state.resumeData,
        customSections: newCustom
      }
    };
  }),
}));
