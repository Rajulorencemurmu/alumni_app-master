import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const JobList = ({ jobs }) => {
  return (
    <View>
      {jobs.map((job) => (
        <TouchableOpacity
          key={job.job_id}
          onPress={() => {
            // Redirect to a new page with the job details and direct link
            // You can use the `job_id` to fetch the job details from an API or use the `job_apply_link` directly
            // For example:
            // navigate.navigate('JobDetails', { jobId: job.job_id });
          }}
        >
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 10 }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{job.job_title}</Text>
            <Text style={{ fontSize: 16 }}>{job.job_min_salary && job.job_max_salary ? `${job.job_min_salary}-${job.job_max_salary}` : 'Salary not available'}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default JobList;
