
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const { searchParams } = new URL(req.url)
    const city = searchParams.get('city') || 'Mumbai'
    const minPrice = searchParams.get('minPrice') || '1000000'
    const maxPrice = searchParams.get('maxPrice') || '100000000'
    const bedrooms = searchParams.get('bedrooms') || '1'
    const propertyType = searchParams.get('propertyType') || 'apartment'

    // Note: You'll need to add your RapidAPI key as a secret
    const rapidApiKey = Deno.env.get('RAPIDAPI_KEY')
    if (!rapidApiKey) {
      throw new Error('RAPIDAPI_KEY is not set')
    }

    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': rapidApiKey,
        'X-RapidAPI-Host': 'realtor.p.rapidapi.com'
      }
    }

    // Fetch properties from Realtor API
    const response = await fetch(
      `https://realtor.p.rapidapi.com/properties/v2/list-for-sale?city=${city}&limit=20&offset=0&price_min=${minPrice}&price_max=${maxPrice}&beds_min=${bedrooms}&type=${propertyType}&sort=relevance`,
      options
    )

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`)
    }

    const data = await response.json()
    const properties = data.properties || []

    // Process and store properties in database
    const processedProperties = properties.map((property: any) => ({
      property_id: property.property_id || property.listing_id || Math.random().toString(),
      title: property.description?.name || property.address?.line || 'Property Listing',
      price: property.price || property.list_price || null,
      bedrooms: property.beds || null,
      bathrooms: property.baths || null,
      sqft: property.building_size?.size || property.lot_size?.size || null,
      lot_size: property.lot_size?.size || null,
      year_built: property.year_built || null,
      property_type: property.prop_type || propertyType,
      status: property.status || 'for_sale',
      address: property.address?.line || '',
      city: property.address?.city || city,
      state: property.address?.state || '',
      zip_code: property.address?.postal_code || '',
      latitude: property.address?.lat || null,
      longitude: property.address?.lon || null,
      description: property.description?.text || property.description?.name || '',
      images: JSON.stringify(property.photos?.map((photo: any) => photo.href) || []),
      amenities: JSON.stringify(property.features || []),
      agent_name: property.agents?.[0]?.name || 'Real Estate Agent',
      agent_phone: property.agents?.[0]?.phone || null,
      agent_email: property.agents?.[0]?.email || null,
      listing_date: property.list_date || new Date().toISOString()
    }))

    // Insert or update properties in database
    for (const property of processedProperties) {
      const { error } = await supabaseClient
        .from('properties')
        .upsert(property, { 
          onConflict: 'property_id',
          ignoreDuplicates: false 
        })

      if (error) {
        console.error('Error inserting property:', error)
      }
    }

    // Return the processed properties
    return new Response(
      JSON.stringify({ 
        success: true, 
        count: processedProperties.length,
        properties: processedProperties 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    )

  } catch (error) {
    console.error('Error:', error)
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message,
        fallback: 'Using mock data'
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    )
  }
})
