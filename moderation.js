
import useSWR from 'swr';
import './CardStyles.css';
import PieChart from '../components/piechart';
const fetcher = (url) => fetch(url).then((res) => res.json());

const Moderation = () => {
  const { data, error } = useSWR('/api/proxy', fetcher); // Fetch data using SWR

  // Check for loading state
  if (!data && !error) return <p></p>;

  // Handle error state
  if (error) return <p>Error loading data.</p>;

  // Check if the necessary structure exists in the data
  const postsData = data?.dashboard?.contentMetrics?.daily?.chartData;
  const postsData2 = data?.dashboard?.contentMetrics?.daily;
  // If the data structure is missing, show an error message
  if (!postsData || postsData.length === 0) return <p>No content data available.</p>;
  const cardData = [
    { label: 'Total Posts', value: postsData2.totalPosts || 'N/A' },
    { label: 'Total Category', value: postsData2.totalCategory || 'N/A' },
    { label: 'Posst Exist', value: postsData2.totalPostExitCount || 'N/A' },
    { label: 'Post Shares', value: postsData2.totalPostShares || 'N/A' },
    { label: 'Views', value: postsData2.totalViews || 'N/A' },
    { label: 'Comments', value: postsData2.totalComments || 'N/A' },
    { label: 'Post Blocked', value: postsData2.totalPostBlocked || 'N/A' },
  ];

  
// "totalPosts":49,"totalCategory":9,"totalPostExitCount":26,"totalPostShares":12,"totalViews":274,"totalComments":36,"totalPostBlocked":1,"totalPostDeleted":1
  return (
    <div className="ml-64 p-8">
      
      <h1 className="text-2xl font-bold">Content Moderation</h1>
      <h2>Content Metrics : Daily</h2>
      <div className="pieChartContainer ">
        
        <PieChart cardData={cardData} />
      </div>

      <table className="moderation-table min-w-full mt-4">
        <thead>
          <tr>
            <th>Timestamp</th>
            <th>Views (Count)</th>
          </tr>
        </thead>
        <tbody>
          {postsData.map((entry, index) => (
            <tr key={index}>
              <td>{entry.timestamp || 'N/A'}</td> {/* Handle undefined timestamps */}
              <td>{entry.count || 0}</td> {/* Handle missing counts */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Moderation;
