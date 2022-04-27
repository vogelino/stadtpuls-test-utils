interface TTNPostBody {
  [key: string]: unknown;
  received_at: string;
  uplink_message: {
    f_port?: number;
    frm_payload?: string;
    decoded_payload: {
      bytes?: number[];
      measurements: number[];
    };
    rx_metadata?: [
      {
        gateway_ids?: {
          gateway_id?: string;
        };
        rssi?: number;
        channel_rssi?: number;
        snr?: number;
      }
    ];
    settings?: {
      data_rate?: {
        lora?: {
          bandwidth?: number;
          spreading_factor?: number;
        };
      };
    };
    received_at?: string;
    locations?: {
      user?: {
        latitude: number;
        longitude: number;
        altitude?: number;
        source: "SOURCE_REGISTRY" | string;
      };
    };
  };
  end_device_ids: {
    [key: string]: unknown;

    device_id: string;
    application_ids: {
      application_id: string;
    };
  };
  simulated: boolean;
}

export function createTTNPayload(
  overrides?: TTNPostBody | Record<string, unknown>
): TTNPostBody {
  return {
    simulated: true,
    end_device_ids: {
      device_id: "123",
      application_ids: {
        application_id: "foo",
      },
      dev_eui: "12345",
    },
    correlation_ids: [
      "as:up:123",
      "rpc:/ttn.lorawan.v3.AppAs/SimulateUplink:123",
    ],
    received_at: new Date().toISOString(),
    uplink_message: {
      f_port: 1,
      frm_payload: "ESIz",
      decoded_payload: {
        measurements: [1, 2, 3],
        bytes: [1, 2, 3],
      },
      rx_metadata: [
        {
          gateway_ids: {
            gateway_id: "test",
          },
          rssi: 42,
          channel_rssi: 42,
          snr: 4.2,
        },
      ],
      settings: {
        data_rate: {
          lora: {
            bandwidth: 125000,
            spreading_factor: 7,
          },
        },
      },
      locations: {
        user: {
          latitude: 13,
          longitude: 52,
          altitude: 23,
          source: "SOURCE_REGISTRY",
        },
      },
    },
    ...overrides,
  };
}
