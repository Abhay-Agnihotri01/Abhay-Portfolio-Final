/* eslint-disable react/button-has-type */
/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/no-autofocus */
/* eslint-disable no-alert */
/* eslint-disable prefer-template */
/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import {
  User,
  FolderGit2,
  Briefcase,
  GraduationCap,
  BarChart3,
  Layers,
  Globe,
  Code,
  Save,
  RotateCcw,
  ExternalLink,
  Download,
  Upload,
  LogOut,
  Plus,
  Trash2,
  ArrowUp,
  ArrowDown,
  Eye,
  EyeOff,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  Sparkles
} from 'lucide-react';
import defaultPortfolioData from '@src/data/defaultPortfolioData';
import usePortfolioData from '@src/hooks/usePortfolioData';
import styles from './admin.module.scss';

const SESSION_TOKEN_KEY = 'abhay_admin_token';

export default function AdminPage() {
  // Auth state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authChecking, setAuthChecking] = useState(true);
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [token, setToken] = useState('');

  // Portfolio Data State
  const { data: serverData, loading: dataLoading, saveContent, resetContent } = usePortfolioData();
  const [formData, setFormData] = useState(defaultPortfolioData);
  const [activeTab, setActiveTab] = useState('profile');
  const [hasChanges, setHasChanges] = useState(false);
  const [toast, setToast] = useState(null);
  const [saving, setSaving] = useState(false);

  // Raw JSON state
  const [rawJsonText, setRawJsonText] = useState('');
  const [rawJsonError, setRawJsonError] = useState('');

  // New item draft states
  const [newSkill, setNewSkill] = useState('');
  const fileInputRef = useRef(null);

  // Check existing session
  useEffect(() => {
    try {
      const storedToken = sessionStorage.getItem(SESSION_TOKEN_KEY);
      if (storedToken && storedToken.includes('token_abhay_authenticated_')) {
        setToken(storedToken);
        setIsAuthenticated(true);
      }
    } catch (e) {
      // ignore
    } finally {
      setAuthChecking(false);
    }
  }, []);

  // Synchronize local form when server data arrives
  useEffect(() => {
    if (serverData) {
      setFormData(serverData);
      setRawJsonText(JSON.stringify(serverData, null, 2));
    }
  }, [serverData]);

  // Toast auto-clear
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3500);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  // Auth Handlers
  const handleLogin = async (e) => {
    e?.preventDefault();
    setLoginError('');

    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: loginUsername, password: loginPassword })
      });

      const resData = await res.json();
      if (res.ok && resData.success) {
        sessionStorage.setItem(SESSION_TOKEN_KEY, resData.token);
        setToken(resData.token);
        setIsAuthenticated(true);
        showToast(`Welcome back, Abhay!`);
      } else {
        setLoginError(resData.error || 'Invalid credentials. Use abhay / abhay');
      }
    } catch (err) {
      setLoginError('Error connecting to authentication service.');
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem(SESSION_TOKEN_KEY);
    setToken('');
    setIsAuthenticated(false);
    showToast('Logged out successfully');
  };

  const fillDemoCredentials = () => {
    setLoginUsername('abhay');
    setLoginPassword('abhay');
    setLoginError('');
  };

  // Field change helper
  const updateFormField = (section, field, value) => {
    setFormData((prev) => {
      const updated = {
        ...prev,
        [section]: {
          ...prev[section],
          [field]: value
        }
      };
      setRawJsonText(JSON.stringify(updated, null, 2));
      return updated;
    });
    setHasChanges(true);
  };

  // Save changes to backend
  const handleSaveChanges = async () => {
    setSaving(true);
    const result = await saveContent(formData, token);
    setSaving(false);

    if (result.success) {
      setHasChanges(false);
      showToast('Portfolio content updated successfully!');
    } else {
      showToast(result.error || 'Failed to save changes.', 'error');
    }
  };

  // Reset to default
  const handleResetDefaults = async () => {
    if (!window.confirm('Are you sure you want to reset all portfolio content to factory defaults?')) {
      return;
    }
    setSaving(true);
    const result = await resetContent(token);
    setSaving(false);

    if (result.success) {
      setFormData(defaultPortfolioData);
      setRawJsonText(JSON.stringify(defaultPortfolioData, null, 2));
      setHasChanges(false);
      showToast('Restored original portfolio data successfully!');
    } else {
      showToast(result.error || 'Failed to reset.', 'error');
    }
  };

  // Export JSON
  const handleExportJson = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(formData, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `abhay-portfolio-backup-${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast('Backup JSON downloaded');
  };

  // Import JSON
  const handleImportJson = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target.result);
        if (!parsed.profile || !parsed.projects) {
          throw new Error('Invalid portfolio schema');
        }
        setFormData(parsed);
        setRawJsonText(JSON.stringify(parsed, null, 2));
        setHasChanges(true);
        showToast('Backup imported. Click "Save All Changes" to publish.');
      } catch (err) {
        showToast('Failed to parse uploaded JSON file.', 'error');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  // Apply Raw JSON
  const handleApplyRawJson = () => {
    try {
      const parsed = JSON.parse(rawJsonText);
      setFormData(parsed);
      setRawJsonError('');
      setHasChanges(true);
      showToast('JSON applied to form state. Click Save to persist.');
    } catch (err) {
      setRawJsonError(err.message);
      showToast('Invalid JSON syntax: ' + err.message, 'error');
    }
  };

  // ----------------------------------------------------
  // Helper array modifiers
  // ----------------------------------------------------
  const handleAddBioParagraph = () => {
    const current = formData.profile.homeBio || [];
    updateFormField('profile', 'homeBio', [...current, 'New bio paragraph...']);
  };

  const handleUpdateBioParagraph = (idx, text) => {
    const current = [...(formData.profile.homeBio || [])];
    current[idx] = text;
    updateFormField('profile', 'homeBio', current);
  };

  const handleRemoveBioParagraph = (idx) => {
    const current = [...(formData.profile.homeBio || [])];
    current.splice(idx, 1);
    updateFormField('profile', 'homeBio', current);
  };

  const handleAddStoryParagraph = () => {
    const current = formData.profile.aboutStory || [];
    updateFormField('profile', 'aboutStory', [...current, 'New story paragraph...']);
  };

  const handleUpdateStoryParagraph = (idx, text) => {
    const current = [...(formData.profile.aboutStory || [])];
    current[idx] = text;
    updateFormField('profile', 'aboutStory', current);
  };

  const handleRemoveStoryParagraph = (idx) => {
    const current = [...(formData.profile.aboutStory || [])];
    current.splice(idx, 1);
    updateFormField('profile', 'aboutStory', current);
  };

  // Project modifiers
  const handleAddProject = () => {
    const newProj = {
      id: `project-${Date.now().toString().slice(-4)}`,
      title: 'New Featured Project',
      company: 'Personal Project',
      date: '2026',
      liveLink: 'https://',
      img: '/projects/linklytics/cover.png',
      link: `/projects/project-${Date.now().toString().slice(-4)}`,
      primary: '#2D2D2D',
      accentColor: '#f0f4f1',
      secondary: '#F2EEE7',
      fillColor: '#F2F3F4',
      menuColor: '#c8b273',
      menuFontColor: '#f0f4f1',
      desc: ['Project overview and key challenges solved.'],
      images: [
        { src: '/projects/linklytics/1.png', tag: 'big', isRight: false }
      ]
    };
    setFormData((prev) => {
      const updated = { ...prev, projects: [newProj, ...prev.projects] };
      setRawJsonText(JSON.stringify(updated, null, 2));
      return updated;
    });
    setHasChanges(true);
    showToast('New project created');
  };

  const handleUpdateProject = (index, field, value) => {
    setFormData((prev) => {
      const projects = [...prev.projects];
      projects[index] = { ...projects[index], [field]: value };
      if (field === 'id') {
        projects[index].link = `/projects/${value}`;
      }
      const updated = { ...prev, projects };
      setRawJsonText(JSON.stringify(updated, null, 2));
      return updated;
    });
    setHasChanges(true);
  };

  const handleRemoveProject = (index) => {
    if (!window.confirm('Delete this project?')) return;
    setFormData((prev) => {
      const projects = [...prev.projects];
      projects.splice(index, 1);
      const updated = { ...prev, projects };
      setRawJsonText(JSON.stringify(updated, null, 2));
      return updated;
    });
    setHasChanges(true);
  };

  const handleMoveProject = (index, direction) => {
    const targetIdx = index + direction;
    if (targetIdx < 0 || targetIdx >= formData.projects.length) return;
    setFormData((prev) => {
      const projects = [...prev.projects];
      const temp = projects[index];
      projects[index] = projects[targetIdx];
      projects[targetIdx] = temp;
      const updated = { ...prev, projects };
      setRawJsonText(JSON.stringify(updated, null, 2));
      return updated;
    });
    setHasChanges(true);
  };

  // Experience modifiers
  const handleAddExperience = () => {
    const newExp = {
      company: 'Company / Organization',
      role: 'Software Engineer',
      period: 'Jan 2026 – Present',
      location: 'Remote',
      image: '/roles/1.png',
      imageBlur: '/roles/role-1-blur.webp',
      desc: 'Engineered key application features and collaborated with cross-functional teams.'
    };
    setFormData((prev) => {
      const updated = { ...prev, experience: [newExp, ...prev.experience] };
      setRawJsonText(JSON.stringify(updated, null, 2));
      return updated;
    });
    setHasChanges(true);
  };

  const handleUpdateExperience = (index, field, value) => {
    setFormData((prev) => {
      const experience = [...prev.experience];
      experience[index] = { ...experience[index], [field]: value };
      const updated = { ...prev, experience };
      setRawJsonText(JSON.stringify(updated, null, 2));
      return updated;
    });
    setHasChanges(true);
  };

  const handleRemoveExperience = (index) => {
    if (!window.confirm('Remove this experience entry?')) return;
    setFormData((prev) => {
      const experience = [...prev.experience];
      experience.splice(index, 1);
      const updated = { ...prev, experience };
      setRawJsonText(JSON.stringify(updated, null, 2));
      return updated;
    });
    setHasChanges(true);
  };

  // Skills chip modifiers
  const handleAddSkill = (e) => {
    e?.preventDefault();
    if (!newSkill.trim()) return;
    const current = formData.credentials?.skills || [];
    if (current.includes(newSkill.trim())) {
      showToast('Skill already in list', 'error');
      return;
    }
    const updatedSkills = [...current, newSkill.trim()];
    setFormData((prev) => {
      const updated = {
        ...prev,
        credentials: { ...prev.credentials, skills: updatedSkills }
      };
      setRawJsonText(JSON.stringify(updated, null, 2));
      return updated;
    });
    setNewSkill('');
    setHasChanges(true);
  };

  const handleRemoveSkill = (skillToRemove) => {
    const current = formData.credentials?.skills || [];
    const updatedSkills = current.filter((s) => s !== skillToRemove);
    setFormData((prev) => {
      const updated = {
        ...prev,
        credentials: { ...prev.credentials, skills: updatedSkills }
      };
      setRawJsonText(JSON.stringify(updated, null, 2));
      return updated;
    });
    setHasChanges(true);
  };

  // Education modifiers
  const handleAddEducation = () => {
    const newEdu = {
      school: 'Institution Name',
      award: 'Degree / Certificate',
      period: '2022 – 2026'
    };
    setFormData((prev) => {
      const education = [...(prev.credentials?.education || []), newEdu];
      const updated = { ...prev, credentials: { ...prev.credentials, education } };
      setRawJsonText(JSON.stringify(updated, null, 2));
      return updated;
    });
    setHasChanges(true);
  };

  const handleUpdateEducation = (index, field, value) => {
    setFormData((prev) => {
      const education = [...(prev.credentials?.education || [])];
      education[index] = { ...education[index], [field]: value };
      const updated = { ...prev, credentials: { ...prev.credentials, education } };
      setRawJsonText(JSON.stringify(updated, null, 2));
      return updated;
    });
    setHasChanges(true);
  };

  const handleRemoveEducation = (index) => {
    setFormData((prev) => {
      const education = [...(prev.credentials?.education || [])];
      education.splice(index, 1);
      const updated = { ...prev, credentials: { ...prev.credentials, education } };
      setRawJsonText(JSON.stringify(updated, null, 2));
      return updated;
    });
    setHasChanges(true);
  };

  // Stats modifiers
  const handleAddStat = () => {
    const newStat = { value: '10+', label: 'New Metric' };
    setFormData((prev) => {
      const stats = [...prev.stats, newStat];
      const updated = { ...prev, stats };
      setRawJsonText(JSON.stringify(updated, null, 2));
      return updated;
    });
    setHasChanges(true);
  };

  const handleUpdateStat = (index, field, value) => {
    setFormData((prev) => {
      const stats = [...prev.stats];
      stats[index] = { ...stats[index], [field]: value };
      const updated = { ...prev, stats };
      setRawJsonText(JSON.stringify(updated, null, 2));
      return updated;
    });
    setHasChanges(true);
  };

  const handleRemoveStat = (index) => {
    setFormData((prev) => {
      const stats = [...prev.stats];
      stats.splice(index, 1);
      const updated = { ...prev, stats };
      setRawJsonText(JSON.stringify(updated, null, 2));
      return updated;
    });
    setHasChanges(true);
  };

  // Social Links modifiers
  const handleAddSocial = () => {
    const newSocial = { title: 'New Platform', href: 'https://', icon: 'globe' };
    setFormData((prev) => {
      const socialLinks = [...prev.socialLinks, newSocial];
      const updated = { ...prev, socialLinks };
      setRawJsonText(JSON.stringify(updated, null, 2));
      return updated;
    });
    setHasChanges(true);
  };

  const handleUpdateSocial = (index, field, value) => {
    setFormData((prev) => {
      const socialLinks = [...prev.socialLinks];
      socialLinks[index] = { ...socialLinks[index], [field]: value };
      const updated = { ...prev, socialLinks };
      setRawJsonText(JSON.stringify(updated, null, 2));
      return updated;
    });
    setHasChanges(true);
  };

  const handleRemoveSocial = (index) => {
    setFormData((prev) => {
      const socialLinks = [...prev.socialLinks];
      socialLinks.splice(index, 1);
      const updated = { ...prev, socialLinks };
      setRawJsonText(JSON.stringify(updated, null, 2));
      return updated;
    });
    setHasChanges(true);
  };

  // ----------------------------------------------------
  // Render: Loading Screen
  // ----------------------------------------------------
  if (authChecking) {
    return (
      <div className={styles.loginWrapper}>
        <div style={{ textAlign: 'center', color: '#8c96a8' }}>
          <div>Loading Admin Environment...</div>
        </div>
      </div>
    );
  }

  // ----------------------------------------------------
  // Render: Login Screen (if not authenticated)
  // ----------------------------------------------------
  if (!isAuthenticated) {
    return (
      <div className={styles.adminRoot}>
        <Head>
          <title>Admin Login · Abhay Agnihotri</title>
        </Head>

        <div className={styles.loginWrapper}>
          <div className={styles.loginCard}>
            <div className={styles.loginHeader}>
              <div className={styles.brandLogo}>
                <ShieldCheck size={28} />
              </div>
              <h1>Portfolio Admin Panel</h1>
              <p>Sign in to manage portfolio content, projects, and bio</p>
            </div>

            <div className={styles.hintBanner}>
              <span>Default credentials: <strong>abhay</strong> / <strong>abhay</strong></span>
              <button type="button" onClick={fillDemoCredentials}>
                Fill Demo
              </button>
            </div>

            {loginError && (
              <div className={styles.errorBanner}>
                <AlertCircle size={16} />
                <span>{loginError}</span>
              </div>
            )}

            <form onSubmit={handleLogin}>
              <div className={styles.formGroup}>
                <label htmlFor="admin-username">Username</label>
                <div className={styles.inputWithIcon}>
                  <input
                    id="admin-username"
                    type="text"
                    placeholder="Enter username"
                    value={loginUsername}
                    onChange={(e) => setLoginUsername(e.target.value)}
                    required
                    autoFocus
                  />
                </div>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="admin-password">Password</label>
                <div className={styles.inputWithIcon}>
                  <input
                    id="admin-password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    className={styles.eyeToggle}
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <button type="submit" className={styles.loginSubmitBtn}>
                Sign In to Dashboard
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  // ----------------------------------------------------
  // Render: Authenticated Dashboard
  // ----------------------------------------------------
  return (
    <div className={styles.adminRoot}>
      <Head>
        <title>Portfolio Admin Dashboard · Abhay Agnihotri</title>
      </Head>

      <div className={styles.dashboardContainer}>
        {/* Top bar */}
        <header className={styles.topBar}>
          <div className={styles.brandArea}>
            <div className={styles.logoBadge}>
              <div className={styles.iconBox}>
                <Sparkles size={18} />
              </div>
              <span className={styles.brandTitle}>Abhay Agnihotri</span>
            </div>
            <span className={styles.adminTag}>Admin Console</span>
            <div className={styles.statusIndicator}>
              <span className={styles.dot} />
              <span>Live Engine Connected</span>
            </div>
            {hasChanges && <span className={styles.unsavedBadge}>Unsaved Changes</span>}
          </div>

          <div className={styles.topActions}>
            <button
              className={styles.btnSecondary}
              onClick={handleExportJson}
              title="Download backup JSON"
            >
              <Download size={14} />
              <span>Backup</span>
            </button>

            <button
              className={styles.btnSecondary}
              onClick={() => fileInputRef.current?.click()}
              title="Import JSON backup"
            >
              <Upload size={14} />
              <span>Restore</span>
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept=".json"
              style={{ display: 'none' }}
              onChange={handleImportJson}
            />

            <button
              className={styles.btnDanger}
              onClick={handleResetDefaults}
              title="Reset all content to original defaults"
            >
              <RotateCcw size={14} />
              <span>Reset</span>
            </button>

            <Link
              href="/"
              target="_blank"
              className={styles.btnSecondary}
              title="Preview live website in a new tab"
            >
              <ExternalLink size={14} />
              <span>Live Site</span>
            </Link>

            <button
              className={styles.btnPrimary}
              onClick={handleSaveChanges}
              disabled={saving}
            >
              <Save size={14} />
              <span>{saving ? 'Saving...' : 'Save All Changes'}</span>
            </button>

            <button
              className={styles.btnSecondary}
              onClick={handleLogout}
              title="Sign out of admin"
            >
              <LogOut size={14} />
            </button>
          </div>
        </header>

        {/* Navigation Tabs */}
        <nav className={styles.tabsNav}>
          <button
            className={`${styles.tabItem} ${activeTab === 'profile' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('profile')}
          >
            <User size={15} />
            <span>Profile & Bio</span>
          </button>

          <button
            className={`${styles.tabItem} ${activeTab === 'projects' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('projects')}
          >
            <FolderGit2 size={15} />
            <span>Projects ({formData.projects?.length || 0})</span>
          </button>

          <button
            className={`${styles.tabItem} ${activeTab === 'experience' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('experience')}
          >
            <Briefcase size={15} />
            <span>Experience ({formData.experience?.length || 0})</span>
          </button>

          <button
            className={`${styles.tabItem} ${activeTab === 'credentials' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('credentials')}
          >
            <GraduationCap size={15} />
            <span>Education & Skills</span>
          </button>

          <button
            className={`${styles.tabItem} ${activeTab === 'stats' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('stats')}
          >
            <BarChart3 size={15} />
            <span>Stats & Numbers</span>
          </button>

          <button
            className={`${styles.tabItem} ${activeTab === 'services' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('services')}
          >
            <Layers size={15} />
            <span>Services & Process</span>
          </button>

          <button
            className={`${styles.tabItem} ${activeTab === 'social' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('social')}
          >
            <Globe size={15} />
            <span>Social & Contact</span>
          </button>

          <button
            className={`${styles.tabItem} ${activeTab === 'raw' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('raw')}
          >
            <Code size={15} />
            <span>Raw JSON Mode</span>
          </button>
        </nav>

        {/* Tab Contents */}
        <main className={styles.mainContent}>
          {/* ---------------------------------------------------- */}
          {/* TAB 1: PROFILE & BIO */}
          {/* ---------------------------------------------------- */}
          {activeTab === 'profile' && (
            <div>
              <div className={styles.sectionHeader}>
                <div>
                  <h2>Profile Identity & Story</h2>
                  <p>Customize your personal branding, bio headlines, and storytelling paragraphs</p>
                </div>
              </div>

              {/* Basic Info */}
              <div className={styles.cardBox}>
                <div className={styles.cardBoxHeader}>
                  <h3>Basic Identity</h3>
                </div>

                <div className={styles.gridTwo}>
                  <div className={styles.formGroup}>
                    <label>Full Name</label>
                    <input
                      type="text"
                      className={styles.inputField}
                      value={formData.profile?.name || ''}
                      onChange={(e) => updateFormField('profile', 'name', e.target.value)}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label>Professional Role / Headline</label>
                    <input
                      type="text"
                      className={styles.inputField}
                      value={formData.profile?.role || ''}
                      onChange={(e) => updateFormField('profile', 'role', e.target.value)}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label>Contact Email</label>
                    <input
                      type="email"
                      className={styles.inputField}
                      value={formData.profile?.email || ''}
                      onChange={(e) => updateFormField('profile', 'email', e.target.value)}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label>Location</label>
                    <input
                      type="text"
                      className={styles.inputField}
                      value={formData.profile?.location || ''}
                      onChange={(e) => updateFormField('profile', 'location', e.target.value)}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label>Availability Status</label>
                    <input
                      type="text"
                      className={styles.inputField}
                      value={formData.profile?.availability || ''}
                      onChange={(e) => updateFormField('profile', 'availability', e.target.value)}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label>Copyright Text (Footer)</label>
                    <input
                      type="text"
                      className={styles.inputField}
                      value={formData.profile?.copyright || ''}
                      onChange={(e) => updateFormField('profile', 'copyright', e.target.value)}
                    />
                  </div>
                </div>

                <div className={styles.formGroup} style={{ marginTop: 14 }}>
                  <label>Hero Tagline (Shown on Home Hero right column)</label>
                  <textarea
                    rows={2}
                    className={styles.textareaField}
                    value={formData.profile?.tagline || ''}
                    onChange={(e) => updateFormField('profile', 'tagline', e.target.value)}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>Brand Description (Footer narrative)</label>
                  <textarea
                    rows={2}
                    className={styles.textareaField}
                    value={formData.profile?.brandDesc || ''}
                    onChange={(e) => updateFormField('profile', 'brandDesc', e.target.value)}
                  />
                </div>
              </div>

              {/* Homepage Story & Quotes */}
              <div className={styles.cardBox}>
                <div className={styles.cardBoxHeader}>
                  <h3>Homepage Quotes & Bio</h3>
                </div>

                <div className={styles.formGroup}>
                  <label>Hero Greeting Title</label>
                  <input
                    type="text"
                    className={styles.inputField}
                    value={formData.profile?.heroGreeting || ''}
                    onChange={(e) => updateFormField('profile', 'heroGreeting', e.target.value)}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>Hero Philosophy Quote</label>
                  <textarea
                    rows={2}
                    className={styles.textareaField}
                    value={formData.profile?.heroQuote || ''}
                    onChange={(e) => updateFormField('profile', 'heroQuote', e.target.value)}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>Homepage Section Quote (Mid-page quote)</label>
                  <textarea
                    rows={2}
                    className={styles.textareaField}
                    value={formData.profile?.midQuote || ''}
                    onChange={(e) => updateFormField('profile', 'midQuote', e.target.value)}
                  />
                </div>

                <div style={{ marginTop: 16 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                    <label style={{ fontWeight: 600, fontSize: 13, color: '#d1d5db' }}>Homepage Bio Paragraphs</label>
                    <button type="button" className={styles.btnSecondary} onClick={handleAddBioParagraph}>
                      <Plus size={13} /> Add Paragraph
                    </button>
                  </div>

                  <div className={styles.itemList}>
                    {(formData.profile?.homeBio || []).map((p, idx) => (
                      <div key={idx} className={styles.itemRow} style={{ padding: 12 }}>
                        <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                          <span style={{ color: '#64748b', fontSize: 12, marginTop: 8 }}>#{idx + 1}</span>
                          <textarea
                            rows={2}
                            className={styles.textareaField}
                            value={p}
                            onChange={(e) => handleUpdateBioParagraph(idx, e.target.value)}
                          />
                          <button
                            type="button"
                            className={`${styles.btnSecondary} ${styles.deleteBtn}`}
                            style={{ padding: '8px 10px', color: '#f87171' }}
                            onClick={() => handleRemoveBioParagraph(idx)}
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* About Page Content */}
              <div className={styles.cardBox}>
                <div className={styles.cardBoxHeader}>
                  <h3>About Page Narrative</h3>
                </div>

                <div className={styles.formGroup}>
                  <label>About Page Hero Headline</label>
                  <textarea
                    rows={2}
                    className={styles.textareaField}
                    value={formData.profile?.aboutHero || ''}
                    onChange={(e) => updateFormField('profile', 'aboutHero', e.target.value)}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>Curiosity Statement</label>
                  <textarea
                    rows={2}
                    className={styles.textareaField}
                    value={formData.profile?.aboutCuriosity || ''}
                    onChange={(e) => updateFormField('profile', 'aboutCuriosity', e.target.value)}
                  />
                </div>

                <div style={{ marginTop: 16 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                    <label style={{ fontWeight: 600, fontSize: 13, color: '#d1d5db' }}>About Page Story Paragraphs</label>
                    <button type="button" className={styles.btnSecondary} onClick={handleAddStoryParagraph}>
                      <Plus size={13} /> Add Paragraph
                    </button>
                  </div>

                  <div className={styles.itemList}>
                    {(formData.profile?.aboutStory || []).map((p, idx) => (
                      <div key={idx} className={styles.itemRow} style={{ padding: 12 }}>
                        <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                          <span style={{ color: '#64748b', fontSize: 12, marginTop: 8 }}>#{idx + 1}</span>
                          <textarea
                            rows={3}
                            className={styles.textareaField}
                            value={p}
                            onChange={(e) => handleUpdateStoryParagraph(idx, e.target.value)}
                          />
                          <button
                            type="button"
                            className={`${styles.btnSecondary} ${styles.deleteBtn}`}
                            style={{ padding: '8px 10px', color: '#f87171' }}
                            onClick={() => handleRemoveStoryParagraph(idx)}
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Prefooter Call to Action */}
              <div className={styles.cardBox}>
                <div className={styles.cardBoxHeader}>
                  <h3>Prefooter Interactive Slice Section</h3>
                </div>

                <div className={styles.gridTwo}>
                  <div className={styles.formGroup}>
                    <label>Call to Action Title</label>
                    <input
                      type="text"
                      className={styles.inputField}
                      value={formData.profile?.prefooterTitle || ''}
                      onChange={(e) => updateFormField('profile', 'prefooterTitle', e.target.value)}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label>Call to Action Subtitle</label>
                    <input
                      type="text"
                      className={styles.inputField}
                      value={formData.profile?.prefooterSub || ''}
                      onChange={(e) => updateFormField('profile', 'prefooterSub', e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ---------------------------------------------------- */}
          {/* TAB 2: PROJECTS */}
          {/* ---------------------------------------------------- */}
          {activeTab === 'projects' && (
            <div>
              <div className={styles.sectionHeader}>
                <div>
                  <h2>Projects Portfolio</h2>
                  <p>Manage project details, slug routes, descriptions, galleries, and custom color themes</p>
                </div>
                <button type="button" className={styles.btnPrimary} onClick={handleAddProject}>
                  <Plus size={14} /> Add New Project
                </button>
              </div>

              <div className={styles.itemList}>
                {(formData.projects || []).map((project, idx) => (
                  <div key={project.id || idx} className={styles.cardBox}>
                    <div className={styles.itemRowHeader}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <span style={{ color: '#64748b', fontSize: 13, fontWeight: 700 }}>#{idx + 1}</span>
                        <span className={styles.itemTitle}>{project.title || 'Untitled Project'}</span>
                        <span style={{ fontSize: 11, color: '#60a5fa', background: '#1e293b', padding: '2px 6px', borderRadius: 4 }}>
                          /{project.id}
                        </span>
                      </div>

                      <div className={styles.itemControls}>
                        <button
                          type="button"
                          onClick={() => handleMoveProject(idx, -1)}
                          disabled={idx === 0}
                          title="Move up"
                        >
                          <ArrowUp size={14} />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleMoveProject(idx, 1)}
                          disabled={idx === formData.projects.length - 1}
                          title="Move down"
                        >
                          <ArrowDown size={14} />
                        </button>
                        <button
                          type="button"
                          className={styles.deleteBtn}
                          onClick={() => handleRemoveProject(idx)}
                          title="Delete project"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>

                    <div className={styles.gridThree}>
                      <div className={styles.formGroup}>
                        <label>Project Title</label>
                        <input
                          type="text"
                          className={styles.inputField}
                          value={project.title || ''}
                          onChange={(e) => handleUpdateProject(idx, 'title', e.target.value)}
                        />
                      </div>

                      <div className={styles.formGroup}>
                        <label>ID / Route Slug (/projects/[id])</label>
                        <input
                          type="text"
                          className={styles.inputField}
                          value={project.id || ''}
                          onChange={(e) => handleUpdateProject(idx, 'id', e.target.value)}
                        />
                      </div>

                      <div className={styles.formGroup}>
                        <label>Company / Project Type</label>
                        <input
                          type="text"
                          className={styles.inputField}
                          value={project.company || ''}
                          onChange={(e) => handleUpdateProject(idx, 'company', e.target.value)}
                        />
                      </div>

                      <div className={styles.formGroup}>
                        <label>Date (e.g. May 2025)</label>
                        <input
                          type="text"
                          className={styles.inputField}
                          value={project.date || ''}
                          onChange={(e) => handleUpdateProject(idx, 'date', e.target.value)}
                        />
                      </div>

                      <div className={styles.formGroup}>
                        <label>Live Demo URL</label>
                        <input
                          type="url"
                          className={styles.inputField}
                          value={project.liveLink || ''}
                          onChange={(e) => handleUpdateProject(idx, 'liveLink', e.target.value)}
                        />
                      </div>

                      <div className={styles.formGroup}>
                        <label>Cover Image Path / URL</label>
                        <input
                          type="text"
                          className={styles.inputField}
                          value={project.img || ''}
                          onChange={(e) => handleUpdateProject(idx, 'img', e.target.value)}
                        />
                      </div>
                    </div>

                    {/* Color Theme */}
                    <div style={{ marginTop: 14 }}>
                      <label style={{ fontSize: 13, fontWeight: 600, color: '#d1d5db', display: 'block', marginBottom: 8 }}>
                        Theme Colors
                      </label>
                      <div className={styles.gridThree}>
                        <div className={styles.formGroup}>
                          <label style={{ fontSize: 11, color: '#94a3b8' }}>Primary Background</label>
                          <div className={styles.colorPickerGroup}>
                            <input
                              type="color"
                              value={project.primary?.startsWith('#') ? project.primary : '#2D2D2D'}
                              onChange={(e) => handleUpdateProject(idx, 'primary', e.target.value)}
                            />
                            <input
                              type="text"
                              className={`${styles.inputField} ${styles.hexInput}`}
                              value={project.primary || ''}
                              onChange={(e) => handleUpdateProject(idx, 'primary', e.target.value)}
                            />
                          </div>
                        </div>

                        <div className={styles.formGroup}>
                          <label style={{ fontSize: 11, color: '#94a3b8' }}>Accent Color</label>
                          <div className={styles.colorPickerGroup}>
                            <input
                              type="color"
                              value={project.accentColor?.startsWith('#') ? project.accentColor : '#f0f4f1'}
                              onChange={(e) => handleUpdateProject(idx, 'accentColor', e.target.value)}
                            />
                            <input
                              type="text"
                              className={`${styles.inputField} ${styles.hexInput}`}
                              value={project.accentColor || ''}
                              onChange={(e) => handleUpdateProject(idx, 'accentColor', e.target.value)}
                            />
                          </div>
                        </div>

                        <div className={styles.formGroup}>
                          <label style={{ fontSize: 11, color: '#94a3b8' }}>Menu Highlight Color</label>
                          <div className={styles.colorPickerGroup}>
                            <input
                              type="color"
                              value={project.menuColor?.startsWith('#') ? project.menuColor : '#c8b273'}
                              onChange={(e) => handleUpdateProject(idx, 'menuColor', e.target.value)}
                            />
                            <input
                              type="text"
                              className={`${styles.inputField} ${styles.hexInput}`}
                              value={project.menuColor || ''}
                              onChange={(e) => handleUpdateProject(idx, 'menuColor', e.target.value)}
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Description Paragraphs */}
                    <div style={{ marginTop: 14 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                        <label style={{ fontSize: 12, fontWeight: 600, color: '#cbd5e1' }}>Project Description Paragraphs</label>
                        <button
                          type="button"
                          className={styles.btnSecondary}
                          style={{ padding: '4px 8px', fontSize: 11 }}
                          onClick={() => {
                            const desc = [...(project.desc || []), 'New description paragraph...'];
                            handleUpdateProject(idx, 'desc', desc);
                          }}
                        >
                          <Plus size={11} /> Add Paragraph
                        </button>
                      </div>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                        {(project.desc || []).map((p, pIdx) => (
                          <div key={pIdx} style={{ display: 'flex', gap: 6 }}>
                            <textarea
                              rows={2}
                              className={styles.textareaField}
                              value={p}
                              onChange={(e) => {
                                const desc = [...project.desc];
                                desc[pIdx] = e.target.value;
                                handleUpdateProject(idx, 'desc', desc);
                              }}
                            />
                            <button
                              type="button"
                              className={`${styles.btnSecondary} ${styles.deleteBtn}`}
                              style={{ padding: '4px 8px', color: '#f87171' }}
                              onClick={() => {
                                const desc = [...project.desc];
                                desc.splice(pIdx, 1);
                                handleUpdateProject(idx, 'desc', desc);
                              }}
                            >
                              <Trash2 size={13} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Gallery Images */}
                    <div style={{ marginTop: 16 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                        <label style={{ fontSize: 12, fontWeight: 600, color: '#cbd5e1' }}>
                          Gallery Images ({project.images?.length || 0})
                        </label>
                        <button
                          type="button"
                          className={styles.btnSecondary}
                          style={{ padding: '4px 8px', fontSize: 11 }}
                          onClick={() => {
                            const images = [
                              ...(project.images || []),
                              { src: '/projects/linklytics/1.png', tag: 'medium', isRight: false }
                            ];
                            handleUpdateProject(idx, 'images', images);
                          }}
                        >
                          <Plus size={11} /> Add Image
                        </button>
                      </div>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                        {(project.images || []).map((imgObj, imgIdx) => (
                          <div key={imgIdx} style={{ display: 'flex', gap: 8, alignItems: 'center', background: '#0a0d14', padding: 8, borderRadius: 6 }}>
                            <input
                              type="text"
                              className={styles.inputField}
                              style={{ flex: 2 }}
                              placeholder="Image path (/projects/...) or URL"
                              value={imgObj.src || ''}
                              onChange={(e) => {
                                const images = [...project.images];
                                images[imgIdx] = { ...images[imgIdx], src: e.target.value };
                                handleUpdateProject(idx, 'images', images);
                              }}
                            />
                            <select
                              className={styles.selectField}
                              style={{ width: 110 }}
                              value={imgObj.tag || 'big'}
                              onChange={(e) => {
                                const images = [...project.images];
                                images[imgIdx] = { ...images[imgIdx], tag: e.target.value };
                                handleUpdateProject(idx, 'images', images);
                              }}
                            >
                              <option value="big">Big (Full)</option>
                              <option value="medium">Medium</option>
                              <option value="small">Small</option>
                            </select>
                            <label style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: '#94a3b8', whiteSpace: 'nowrap' }}>
                              <input
                                type="checkbox"
                                checked={!!imgObj.isRight}
                                onChange={(e) => {
                                  const images = [...project.images];
                                  images[imgIdx] = { ...images[imgIdx], isRight: e.target.checked };
                                  handleUpdateProject(idx, 'images', images);
                                }}
                              />
                              Float Right
                            </label>
                            <button
                              type="button"
                              className={`${styles.btnSecondary} ${styles.deleteBtn}`}
                              style={{ padding: '6px 8px', color: '#f87171' }}
                              onClick={() => {
                                const images = [...project.images];
                                images.splice(imgIdx, 1);
                                handleUpdateProject(idx, 'images', images);
                              }}
                            >
                              <Trash2 size={13} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ---------------------------------------------------- */}
          {/* TAB 3: EXPERIENCE */}
          {/* ---------------------------------------------------- */}
          {activeTab === 'experience' && (
            <div>
              <div className={styles.sectionHeader}>
                <div>
                  <h2>Work Experience</h2>
                  <p>Manage your professional roles, internships, dates, and accomplishments</p>
                </div>
                <button type="button" className={styles.btnPrimary} onClick={handleAddExperience}>
                  <Plus size={14} /> Add Experience
                </button>
              </div>

              <div className={styles.itemList}>
                {(formData.experience || []).map((item, idx) => (
                  <div key={idx} className={styles.cardBox}>
                    <div className={styles.itemRowHeader}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <span style={{ color: '#64748b', fontSize: 13, fontWeight: 700 }}>#{idx + 1}</span>
                        <span className={styles.itemTitle}>{item.company || 'Company'}</span>
                        <span style={{ fontSize: 12, color: '#94a3b8' }}>({item.role})</span>
                      </div>

                      <div className={styles.itemControls}>
                        <button
                          type="button"
                          className={styles.deleteBtn}
                          onClick={() => handleRemoveExperience(idx)}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>

                    <div className={styles.gridTwo}>
                      <div className={styles.formGroup}>
                        <label>Company / Organization</label>
                        <input
                          type="text"
                          className={styles.inputField}
                          value={item.company || ''}
                          onChange={(e) => handleUpdateExperience(idx, 'company', e.target.value)}
                        />
                      </div>

                      <div className={styles.formGroup}>
                        <label>Role / Title</label>
                        <input
                          type="text"
                          className={styles.inputField}
                          value={item.role || ''}
                          onChange={(e) => handleUpdateExperience(idx, 'role', e.target.value)}
                        />
                      </div>

                      <div className={styles.formGroup}>
                        <label>Period (e.g. Jul 2025 – Aug 2025)</label>
                        <input
                          type="text"
                          className={styles.inputField}
                          value={item.period || ''}
                          onChange={(e) => handleUpdateExperience(idx, 'period', e.target.value)}
                        />
                      </div>

                      <div className={styles.formGroup}>
                        <label>Location (e.g. Remote or City, Country)</label>
                        <input
                          type="text"
                          className={styles.inputField}
                          value={item.location || ''}
                          onChange={(e) => handleUpdateExperience(idx, 'location', e.target.value)}
                        />
                      </div>

                      <div className={styles.formGroup}>
                        <label>Artwork Image (/roles/1.png)</label>
                        <input
                          type="text"
                          className={styles.inputField}
                          value={item.image || ''}
                          onChange={(e) => handleUpdateExperience(idx, 'image', e.target.value)}
                        />
                      </div>

                      <div className={styles.formGroup}>
                        <label>Blurred Artwork (/roles/role-1-blur.webp)</label>
                        <input
                          type="text"
                          className={styles.inputField}
                          value={item.imageBlur || ''}
                          onChange={(e) => handleUpdateExperience(idx, 'imageBlur', e.target.value)}
                        />
                      </div>
                    </div>

                    <div className={styles.formGroup} style={{ marginTop: 12 }}>
                      <label>Description / Key Deliverables</label>
                      <textarea
                        rows={3}
                        className={styles.textareaField}
                        value={item.desc || ''}
                        onChange={(e) => handleUpdateExperience(idx, 'desc', e.target.value)}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ---------------------------------------------------- */}
          {/* TAB 4: EDUCATION & SKILLS */}
          {/* ---------------------------------------------------- */}
          {activeTab === 'credentials' && (
            <div>
              <div className={styles.sectionHeader}>
                <div>
                  <h2>Education, Skills & Languages</h2>
                  <p>Keep your technical stack tags, degrees, and language proficiencies up to date</p>
                </div>
              </div>

              {/* Skills Tags Manager */}
              <div className={styles.cardBox}>
                <div className={styles.cardBoxHeader}>
                  <h3>Technical Stack & Skills ({formData.credentials?.skills?.length || 0})</h3>
                </div>

                <div className={styles.tagContainer}>
                  {(formData.credentials?.skills || []).map((skill) => (
                    <span key={skill} className={styles.skillChip}>
                      {skill}
                      <button
                        type="button"
                        className={styles.removeTagBtn}
                        onClick={() => handleRemoveSkill(skill)}
                        title={`Remove ${skill}`}
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>

                <form onSubmit={handleAddSkill} className={styles.addTagForm}>
                  <input
                    type="text"
                    className={styles.inputField}
                    placeholder="Type skill name & press Enter..."
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                  />
                  <button type="submit" className={styles.btnPrimary}>
                    <Plus size={14} /> Add
                  </button>
                </form>
              </div>

              {/* Education */}
              <div className={styles.cardBox}>
                <div className={styles.cardBoxHeader}>
                  <h3>Education Degrees</h3>
                  <button type="button" className={styles.btnSecondary} onClick={handleAddEducation}>
                    <Plus size={13} /> Add Degree
                  </button>
                </div>

                <div className={styles.itemList}>
                  {(formData.credentials?.education || []).map((edu, idx) => (
                    <div key={idx} className={styles.itemRow}>
                      <div className={styles.itemRowHeader}>
                        <span className={styles.itemTitle}>{edu.award || 'Degree'}</span>
                        <button
                          type="button"
                          className={`${styles.btnSecondary} ${styles.deleteBtn}`}
                          style={{ color: '#f87171' }}
                          onClick={() => handleRemoveEducation(idx)}
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>

                      <div className={styles.gridThree}>
                        <div className={styles.formGroup}>
                          <label>School / University</label>
                          <input
                            type="text"
                            className={styles.inputField}
                            value={edu.school || ''}
                            onChange={(e) => handleUpdateEducation(idx, 'school', e.target.value)}
                          />
                        </div>

                        <div className={styles.formGroup}>
                          <label>Degree / Award</label>
                          <input
                            type="text"
                            className={styles.inputField}
                            value={edu.award || ''}
                            onChange={(e) => handleUpdateEducation(idx, 'award', e.target.value)}
                          />
                        </div>

                        <div className={styles.formGroup}>
                          <label>Period</label>
                          <input
                            type="text"
                            className={styles.inputField}
                            value={edu.period || ''}
                            onChange={(e) => handleUpdateEducation(idx, 'period', e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Languages */}
              <div className={styles.cardBox}>
                <div className={styles.cardBoxHeader}>
                  <h3>Languages</h3>
                  <button
                    type="button"
                    className={styles.btnSecondary}
                    onClick={() => {
                      const languages = [...(formData.credentials?.languages || []), { name: 'Language', level: 'Fluent' }];
                      setFormData((prev) => {
                        const updated = { ...prev, credentials: { ...prev.credentials, languages } };
                        setRawJsonText(JSON.stringify(updated, null, 2));
                        return updated;
                      });
                      setHasChanges(true);
                    }}
                  >
                    <Plus size={13} /> Add Language
                  </button>
                </div>

                <div className={styles.itemList}>
                  {(formData.credentials?.languages || []).map((lang, idx) => (
                    <div key={idx} style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                      <input
                        type="text"
                        className={styles.inputField}
                        placeholder="Language name"
                        value={lang.name || ''}
                        onChange={(e) => {
                          const languages = [...formData.credentials.languages];
                          languages[idx] = { ...languages[idx], name: e.target.value };
                          setFormData((prev) => {
                            const updated = { ...prev, credentials: { ...prev.credentials, languages } };
                            setRawJsonText(JSON.stringify(updated, null, 2));
                            return updated;
                          });
                          setHasChanges(true);
                        }}
                      />
                      <input
                        type="text"
                        className={styles.inputField}
                        placeholder="Proficiency level (e.g. Native, Fluent)"
                        value={lang.level || ''}
                        onChange={(e) => {
                          const languages = [...formData.credentials.languages];
                          languages[idx] = { ...languages[idx], level: e.target.value };
                          setFormData((prev) => {
                            const updated = { ...prev, credentials: { ...prev.credentials, languages } };
                            setRawJsonText(JSON.stringify(updated, null, 2));
                            return updated;
                          });
                          setHasChanges(true);
                        }}
                      />
                      <button
                        type="button"
                        className={`${styles.btnSecondary} ${styles.deleteBtn}`}
                        style={{ color: '#f87171' }}
                        onClick={() => {
                          const languages = [...formData.credentials.languages];
                          languages.splice(idx, 1);
                          setFormData((prev) => {
                            const updated = { ...prev, credentials: { ...prev.credentials, languages } };
                            setRawJsonText(JSON.stringify(updated, null, 2));
                            return updated;
                          });
                          setHasChanges(true);
                        }}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ---------------------------------------------------- */}
          {/* TAB 5: STATS & NUMBERS */}
          {/* ---------------------------------------------------- */}
          {activeTab === 'stats' && (
            <div>
              <div className={styles.sectionHeader}>
                <div>
                  <h2>By the Numbers (Homepage Stats)</h2>
                  <p>Display your key achievements, years of experience, and availability note</p>
                </div>
                <button type="button" className={styles.btnPrimary} onClick={handleAddStat}>
                  <Plus size={14} /> Add Metric
                </button>
              </div>

              <div className={styles.cardBox}>
                <div className={styles.cardBoxHeader}>
                  <h3>Metric Items</h3>
                </div>

                <div className={styles.gridTwo}>
                  {(formData.stats || []).map((stat, idx) => (
                    <div key={idx} className={styles.itemRow}>
                      <div className={styles.itemRowHeader}>
                        <span className={styles.itemTitle}>Stat #{idx + 1}</span>
                        <button
                          type="button"
                          className={`${styles.btnSecondary} ${styles.deleteBtn}`}
                          style={{ color: '#f87171' }}
                          onClick={() => handleRemoveStat(idx)}
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>

                      <div style={{ display: 'flex', gap: 10 }}>
                        <div style={{ width: '40%' }}>
                          <label style={{ fontSize: 11, color: '#94a3b8' }}>Big Value</label>
                          <input
                            type="text"
                            className={styles.inputField}
                            placeholder="e.g. 4+"
                            value={stat.value || ''}
                            onChange={(e) => handleUpdateStat(idx, 'value', e.target.value)}
                          />
                        </div>

                        <div style={{ flex: 1 }}>
                          <label style={{ fontSize: 11, color: '#94a3b8' }}>Label</label>
                          <input
                            type="text"
                            className={styles.inputField}
                            placeholder="e.g. Projects shipped"
                            value={stat.label || ''}
                            onChange={(e) => handleUpdateStat(idx, 'label', e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className={styles.formGroup} style={{ marginTop: 20 }}>
                  <label>Stats Section Footer Note</label>
                  <input
                    type="text"
                    className={styles.inputField}
                    placeholder="e.g. Open for freelance projects and full-time opportunities."
                    value={formData.profile?.statsNote || ''}
                    onChange={(e) => updateFormField('profile', 'statsNote', e.target.value)}
                  />
                </div>
              </div>
            </div>
          )}

          {/* ---------------------------------------------------- */}
          {/* TAB 6: SERVICES & PROCESS */}
          {/* ---------------------------------------------------- */}
          {activeTab === 'services' && (
            <div>
              <div className={styles.sectionHeader}>
                <div>
                  <h2>Services & Process (About Page)</h2>
                  <p>Customize the interactive 3D spheres, deliverables, and engineering methodology</p>
                </div>
              </div>

              {/* Services */}
              <div className={styles.cardBox}>
                <div className={styles.cardBoxHeader}>
                  <h3>Services (3 Items matching 3D Spheres)</h3>
                </div>

                <div className={styles.itemList}>
                  {(formData.services || []).map((service, sIdx) => (
                    <div key={sIdx} className={styles.itemRow}>
                      <div className={styles.gridThree}>
                        <div className={styles.formGroup}>
                          <label>Sphere Badge Label (1 word)</label>
                          <input
                            type="text"
                            className={styles.inputField}
                            value={service.smallTitle || ''}
                            onChange={(e) => {
                              const services = [...formData.services];
                              services[sIdx] = { ...services[sIdx], smallTitle: e.target.value };
                              setFormData((prev) => {
                                const updated = { ...prev, services };
                                setRawJsonText(JSON.stringify(updated, null, 2));
                                return updated;
                              });
                              setHasChanges(true);
                            }}
                          />
                        </div>

                        <div className={styles.formGroup} style={{ gridColumn: 'span 2' }}>
                          <label>Service Headline</label>
                          <input
                            type="text"
                            className={styles.inputField}
                            value={service.bigTitle || ''}
                            onChange={(e) => {
                              const services = [...formData.services];
                              services[sIdx] = { ...services[sIdx], bigTitle: e.target.value };
                              setFormData((prev) => {
                                const updated = { ...prev, services };
                                setRawJsonText(JSON.stringify(updated, null, 2));
                                return updated;
                              });
                              setHasChanges(true);
                            }}
                          />
                        </div>
                      </div>

                      <div className={styles.formGroup}>
                        <label>Overview Paragraph</label>
                        <textarea
                          rows={2}
                          className={styles.textareaField}
                          value={service.desc?.[0] || ''}
                          onChange={(e) => {
                            const services = [...formData.services];
                            services[sIdx] = { ...services[sIdx], desc: [e.target.value] };
                            setFormData((prev) => {
                              const updated = { ...prev, services };
                              setRawJsonText(JSON.stringify(updated, null, 2));
                              return updated;
                            });
                            setHasChanges(true);
                          }}
                        />
                      </div>

                      {/* Options / Deliverables */}
                      <div style={{ marginTop: 10 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                          <span style={{ fontSize: 12, fontWeight: 600, color: '#cbd5e1' }}>Deliverables / Features</span>
                          <button
                            type="button"
                            className={styles.btnSecondary}
                            style={{ padding: '3px 8px', fontSize: 11 }}
                            onClick={() => {
                              const services = [...formData.services];
                              const options = [...(services[sIdx].options || []), { title: 'New Deliverable', desc: 'Description' }];
                              services[sIdx] = { ...services[sIdx], options };
                              setFormData((prev) => {
                                const updated = { ...prev, services };
                                setRawJsonText(JSON.stringify(updated, null, 2));
                                return updated;
                              });
                              setHasChanges(true);
                            }}
                          >
                            <Plus size={11} /> Add Deliverable
                          </button>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                          {(service.options || []).map((opt, oIdx) => (
                            <div key={oIdx} style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                              <input
                                type="text"
                                className={styles.inputField}
                                style={{ width: '35%' }}
                                placeholder="Title"
                                value={opt.title || ''}
                                onChange={(e) => {
                                  const services = [...formData.services];
                                  const options = [...services[sIdx].options];
                                  options[oIdx] = { ...options[oIdx], title: e.target.value };
                                  services[sIdx] = { ...services[sIdx], options };
                                  setFormData((prev) => {
                                    const updated = { ...prev, services };
                                    setRawJsonText(JSON.stringify(updated, null, 2));
                                    return updated;
                                  });
                                  setHasChanges(true);
                                }}
                              />
                              <input
                                type="text"
                                className={styles.inputField}
                                style={{ flex: 1 }}
                                placeholder="Description"
                                value={opt.desc || ''}
                                onChange={(e) => {
                                  const services = [...formData.services];
                                  const options = [...services[sIdx].options];
                                  options[oIdx] = { ...options[oIdx], desc: e.target.value };
                                  services[sIdx] = { ...services[sIdx], options };
                                  setFormData((prev) => {
                                    const updated = { ...prev, services };
                                    setRawJsonText(JSON.stringify(updated, null, 2));
                                    return updated;
                                  });
                                  setHasChanges(true);
                                }}
                              />
                              <button
                                type="button"
                                className={`${styles.btnSecondary} ${styles.deleteBtn}`}
                                style={{ padding: '6px 8px', color: '#f87171' }}
                                onClick={() => {
                                  const services = [...formData.services];
                                  const options = [...services[sIdx].options];
                                  options.splice(oIdx, 1);
                                  services[sIdx] = { ...services[sIdx], options };
                                  setFormData((prev) => {
                                    const updated = { ...prev, services };
                                    setRawJsonText(JSON.stringify(updated, null, 2));
                                    return updated;
                                  });
                                  setHasChanges(true);
                                }}
                              >
                                <Trash2 size={13} />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ---------------------------------------------------- */}
          {/* TAB 7: SOCIAL & CONTACT */}
          {/* ---------------------------------------------------- */}
          {activeTab === 'social' && (
            <div>
              <div className={styles.sectionHeader}>
                <div>
                  <h2>Social Links & Reach</h2>
                  <p>Manage your public networking profiles and icons across navigation menus</p>
                </div>
                <button type="button" className={styles.btnPrimary} onClick={handleAddSocial}>
                  <Plus size={14} /> Add Social Link
                </button>
              </div>

              <div className={styles.cardBox}>
                <div className={styles.cardBoxHeader}>
                  <h3>Active Social Links</h3>
                </div>

                <div className={styles.itemList}>
                  {(formData.socialLinks || []).map((social, idx) => (
                    <div key={idx} style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                      <input
                        type="text"
                        className={styles.inputField}
                        style={{ width: 140 }}
                        placeholder="Platform Title"
                        value={social.title || ''}
                        onChange={(e) => handleUpdateSocial(idx, 'title', e.target.value)}
                      />

                      <input
                        type="url"
                        className={styles.inputField}
                        style={{ flex: 1 }}
                        placeholder="https://..."
                        value={social.href || ''}
                        onChange={(e) => handleUpdateSocial(idx, 'href', e.target.value)}
                      />

                      <select
                        className={styles.selectField}
                        style={{ width: 130 }}
                        value={social.icon || 'globe'}
                        onChange={(e) => handleUpdateSocial(idx, 'icon', e.target.value)}
                      >
                        <option value="linkedin">LinkedIn</option>
                        <option value="github">GitHub</option>
                        <option value="x">X / Twitter</option>
                        <option value="instagram">Instagram</option>
                        <option value="globe">Other / Globe</option>
                      </select>

                      <button
                        type="button"
                        className={`${styles.btnSecondary} ${styles.deleteBtn}`}
                        style={{ color: '#f87171' }}
                        onClick={() => handleRemoveSocial(idx)}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ---------------------------------------------------- */}
          {/* TAB 8: RAW JSON / BACKUP */}
          {/* ---------------------------------------------------- */}
          {activeTab === 'raw' && (
            <div>
              <div className={styles.sectionHeader}>
                <div>
                  <h2>Raw JSON Content Engine</h2>
                  <p>Direct low-level JSON access for power users and batch updates</p>
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button
                    type="button"
                    className={styles.btnSecondary}
                    onClick={() => {
                      try {
                        const parsed = JSON.parse(rawJsonText);
                        setRawJsonText(JSON.stringify(parsed, null, 2));
                        showToast('JSON beautified');
                      } catch (e) {
                        showToast('Cannot format invalid JSON', 'error');
                      }
                    }}
                  >
                    Format JSON
                  </button>

                  <button
                    type="button"
                    className={styles.btnPrimary}
                    onClick={handleApplyRawJson}
                  >
                    Apply Raw JSON
                  </button>
                </div>
              </div>

              {rawJsonError && (
                <div className={styles.errorBanner} style={{ marginBottom: 14 }}>
                  <AlertCircle size={16} />
                  <span>Syntax Error: {rawJsonError}</span>
                </div>
              )}

              <textarea
                className={styles.codeEditorArea}
                value={rawJsonText}
                onChange={(e) => setRawJsonText(e.target.value)}
                spellCheck={false}
              />
            </div>
          )}
        </main>
      </div>

      {/* Floating Toast Notification */}
      {toast && (
        <div className={`${styles.toastNotification} ${toast.type === 'error' ? styles.error : styles.success}`}>
          {toast.type === 'error' ? <AlertCircle size={16} /> : <CheckCircle2 size={16} />}
          <span>{toast.message}</span>
        </div>
      )}
    </div>
  );
}
