
import useSWR from 'swr';
import './CardStyles.css'; // Import custom CSS for card styles


const fetcher = (url) => fetch(url).then((res) => res.json());

const Users = () => {
  const { data, error } = useSWR('/api/proxy', fetcher); // Fetch data using SWR

  if (!data && !error) return <p></p>; // Check for loading state
  if (error) return <p>Error loading data.</p>; // Handle error state

  const userMetrics = data?.dashboard?.userMetrics?.daily;
  if (!userMetrics) return <p>No user data available.</p>; // Handle missing data

  // Card data for metrics
  const cardData = [
    { label: 'Total Users', value: userMetrics.totalUser || 'N/A' },
    { label: 'Total Referrals', value: userMetrics.totalReferral || 'N/A' },
    { label: 'Active Users', value: userMetrics.activeUser || 'N/A' },
    { label: 'Creators', value: userMetrics.creator || 'N/A' },
  ];

  return (
    <div className="ml-64 p-8">
      
      <h1 className="text-2xl font-bold text-center mb-8" >User Management</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cardData.map((card, index) => (
          <div key={index} className="card">
            <h2 className="card-title">{card.label}</h2>
            <p className="card-value">{card.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Users;
