import React from 'react';

const CybersecurityPage = () => {
  return (
    <div style={{ padding: '40px', maxWidth: '1100px', margin: '0 auto', fontFamily: 'Segoe UI, sans-serif' }}>
      <div style={{ background: 'linear-gradient(135deg, #4a154b, #2e0830)', borderLeft: '4px solid #a855f7', padding: '20px', borderRadius: '8px', marginBottom: '30px', color: '#fff' }}>
        <h1 style={{ color: '#d8b4fe', margin: '0 0 10px 0' }}>🛡️ Cybersecurity & Ethical Hacking Track</h1>
        <p style={{ color: '#e9d5ff', margin: 0 }}>Assigned Developer: <strong>Samia Hassan (Frontend)</strong></p>
        <p style={{ color: '#c084fc', fontSize: '14px', marginTop: '5px' }}>
          Directory: <code>frontend/src/pages/cybersecurity/</code>
        </p>
      </div>

      <h2 style={{ color: '#4a154b' }}>Track Sub-pages & Featured Courses:</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', marginTop: '20px' }}>
        
        {/* Sub-page 1 */}
        <div style={{ backgroundColor: '#fff', border: '1px solid #e9d5ff', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
          <h3 style={{ color: '#4a154b' }}>1. Ethical Hacking & Penetration Testing</h3>
          <p style={{ color: '#555' }}>Learn vulnerability scanning, Kali Linux tools, Metasploit exploitation, and web app security auditing.</p>
          <ul style={{ color: '#666', fontSize: '13px', paddingLeft: '20px' }}>
            <li>Hands-on Kali Linux Virtual Labs</li>
            <li>CEH Aligned Certification Badge</li>
            <li>Bug Bounty Hunting Basics</li>
          </ul>
          <button style={{ backgroundColor: '#4a154b', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer', width: '100%' }}>Enroll in Ethical Hacking</button>
        </div>

        {/* Sub-page 2 */}
        <div style={{ backgroundColor: '#fff', border: '1px solid #e9d5ff', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
          <h3 style={{ color: '#4a154b' }}>2. Network Security & Defense Certification</h3>
          <p style={{ color: '#555' }}>Master Wireshark packet analysis, firewall configuration, VPN protocols, and CompTIA Security+ prep.</p>
          <ul style={{ color: '#666', fontSize: '13px', paddingLeft: '20px' }}>
            <li>Cisco & PfSense Lab Scenarios</li>
            <li>CompTIA Security+ Exam Guide</li>
            <li>Zero Trust Network Architecture</li>
          </ul>
          <button style={{ backgroundColor: '#4a154b', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer', width: '100%' }}>Enroll in Network Defense</button>
        </div>

        {/* Sub-page 3 */}
        <div style={{ backgroundColor: '#fff', border: '1px solid #e9d5ff', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
          <h3 style={{ color: '#4a154b' }}>3. Corporate Cybersecurity Training</h3>
          <p style={{ color: '#555' }}>B2B security awareness programs, employee phishing simulations, and ISO 27001 compliance frameworks.</p>
          <ul style={{ color: '#666', fontSize: '13px', paddingLeft: '20px' }}>
            <li>Employee Phishing Simulations</li>
            <li>Incident Response Playbooks</li>
            <li>ISO 27001 Audit Readiness</li>
          </ul>
          <button style={{ backgroundColor: '#4a154b', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer', width: '100%' }}>Request Corporate Quote</button>
        </div>

      </div>
    </div>
  );
};

export default CybersecurityPage;
