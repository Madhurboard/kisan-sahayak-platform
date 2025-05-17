import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabaseClient';

const Profile = () => {
  const { currentUser, logout } = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    avatar_url: '',
    phone: '',
    crop_type: '',
    soil_type: '',
  });

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  useEffect(() => {
    const fetchOrCreateProfile = async () => {
      if (!currentUser) return;
      setLoading(true);

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', currentUser.id)
        .single();

      if (error && error.code === 'PGRST116') {
        // No profile exists, create one using Google data
        const { full_name, avatar_url } = currentUser.user_metadata;
        const [first_name, ...rest] = full_name?.split(' ') || ['Farmer'];
        const last_name = rest.join(' ');

        const { error: insertError } = await supabase.from('profiles').insert({
          id: currentUser.id,
          first_name,
          last_name,
          avatar_url,
          phone: '',
          crop_type: '',
          soil_type: '',
        });

        if (insertError) {
          console.error('Error inserting profile:', insertError.message);
        }

        // Re-fetch after insert
        const { data: newData } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', currentUser.id)
          .single();

        if (newData) {
          setProfile(newData);
          setFormData({
            first_name: newData.first_name || '',
            last_name: newData.last_name || '',
            avatar_url: newData.avatar_url || '',
            phone: newData.phone || '',
            crop_type: newData.crop_type || '',
            soil_type: newData.soil_type || '',
          });
        }
      } else if (data) {
        // Profile exists
        setProfile(data);
        setFormData({
          first_name: data.first_name || '',
          last_name: data.last_name || '',
          avatar_url: data.avatar_url || '',
          phone: data.phone || '',
          crop_type: data.crop_type || '',
          soil_type: data.soil_type || '',
        });
      } else if (error) {
        console.error('Error fetching profile:', error.message);
      }

      setLoading(false);
    };

    fetchOrCreateProfile();
  }, [currentUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    const { error } = await supabase
      .from('profiles')
      .update({
        phone: formData.phone,
        crop_type: formData.crop_type,
        soil_type: formData.soil_type,
      })
      .eq('id', currentUser.id);

    if (error) {
      console.error('Error updating profile:', error.message);
    } else {
      setProfile({ ...profile, ...formData });
      setEditing(false);
    }
  };

  if (!currentUser || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  const fullName =
    formData.first_name || formData.last_name
      ? `${formData.first_name} ${formData.last_name}`
      : 'Farmer';

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow bg-muted/10 py-10">
        <div className="container max-w-2xl">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-semibold">Your Profile</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center space-x-4">
                <Avatar className="h-16 w-16 border-2 border-green-500">
                  <AvatarImage src={formData.avatar_url} alt={fullName} />
                  <AvatarFallback>{fullName.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-xl font-bold">{fullName}</h2>
                  <p className="text-muted-foreground text-sm">{currentUser.email}</p>
                  <p className="text-muted-foreground text-xs">
                    Joined: {profile?.created_at?.split('T')[0]}
                  </p>
                </div>
              </div>

              {editing ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Phone</label>
                    <Input name="phone" value={formData.phone} onChange={handleChange} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Crop Type</label>
                    <Input name="crop_type" value={formData.crop_type} onChange={handleChange} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Soil Type</label>
                    <Input name="soil_type" value={formData.soil_type} onChange={handleChange} />
                  </div>

                  <div className="flex gap-2">
                    <Button onClick={handleSave}>Save</Button>
                    <Button variant="outline" onClick={() => setEditing(false)}>
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 text-sm">
                    <div><strong>Phone:</strong> {profile?.phone || '-'}</div>
                    <div><strong>Crop Type:</strong> {profile?.crop_type || '-'}</div>
                    <div><strong>Soil Type:</strong> {profile?.soil_type || '-'}</div>
                  </div>

                  <div className="flex gap-2 mt-4">
                    <Button onClick={() => setEditing(true)}>Edit Profile</Button>
                    <Button variant="destructive" onClick={handleLogout}>
                      {t('nav.logout') || 'Logout'}
                    </Button>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Profile;
