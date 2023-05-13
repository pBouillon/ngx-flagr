import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Contributor = ({ avatarUrl, login, profileUrl }) => (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', maxWidth: '100px' }}>
    <a href={profileUrl} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ borderRadius: '50%', overflow: 'hidden', width: '100px', height: '100px', marginBottom: '8px' }}>
        <img src={avatarUrl} alt={login} style={{ width: '100%', height: 'auto' }} />
      </div>
      <span style={{ textAlign: 'center' }}>{login}</span>
    </a>
  </div>
);

const ContributorList = () => {
  const [contributors, setContributors] = useState([]);

  useEffect(() => {
    const fetchContributors = async () => {
      const response = await axios.get(
        'https://api.github.com/repos/pBouillon/ngx-flagr/contributors'
      );

      setContributors(response.data);
    };
    fetchContributors();
  }, []);

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', justifyItems: 'center', gap: '10px' }}>
      {contributors.map(contributor => (
        <Contributor
          key={contributor.id}
          avatarUrl={contributor.avatar_url}
          login={contributor.login}
          profileUrl={contributor.html_url}
        />
      ))}
    </div>
  );
};

export default ContributorList;
